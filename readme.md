# ShelfPulse AI: Complete System Prompt for ML Training & React Integration

## PROJECT OVERVIEW
**ShelfPulse AI** - A Computer Vision-driven "Store Brain" that eliminates the $1T global ghost economy of empty retail shelves through real-time shelf auditing, SKU detection, and predictive replenishment.

## DATASET PREPARATION
- **Source**: Retail shelf images (minimum 500 labeled images recommended)
- **Format**: YOLO format (images + txt annotations with bounding boxes)
- **Labels**: SKU classes (e.g., "Coca-Cola-500ml", "Pepsi-250ml", "Empty-Slot", "Out-of-Stock")
- **Splits**: 70% train, 20% val, 10% test
- **Augmentation**: Enable auto-augmentation (rotation, brightness, contrast)

## TRAINING CONFIGURATION

### Model Selection
- **Base Model**: YOLOv8m (medium) or YOLOv8n (nano for lighter inference)
- **Input Size**: 640x640 pixels
- **Batch Size**: 16 (adjust based on GPU memory)
- **Epochs**: 100 (with early stopping at 50 if validation plateaus)
- **Optimizer**: SGD with learning rate 0.01
- **Loss Function**: Focal loss for imbalanced shelf data

### Hyperparameters
- **Confidence Threshold**: 0.5
- **IoU Threshold**: 0.45
- **Box Loss Weight**: 0.05
- **Class Loss Weight**: 0.5
- **Object Loss Weight**: 1.0

### Data Augmentation Pipeline
```python
# Recommended augmentation params
hsv_h: 0.015  # HSV-Hue
hsv_s: 0.7    # HSV-Saturation (lighting variations)
hsv_v: 0.4    # HSV-Value (brightness)
degrees: 10   # Rotation (shelf angles)
translate: 0.1  # Shift
scale: 0.5    # Zoom
flipud: 0.5   # Flip up-down
fliplr: 0.5   # Flip left-right
```

## OUTPUT DELIVERABLES
1. **Trained Model**: `best.pt` (PyTorch weights)
2. **ONNX Export**: `model.onnx` (for web inference)
3. **TensorFlow.js Export**: `tfjs_model/` directory
4. **Metrics Report**:
   - Precision per class
   - Recall per class
   - mAP@0.5 (mean Average Precision)
   - Inference time per image
5. **Confusion Matrix**: Class-wise detection accuracy
6. **Performance Dashboard**: JSON export with metrics

## QUANTIZATION FOR WEB
- Apply INT8 quantization to reduce model size by 4x
- Target size: <50MB for browser loading
- Maintain >90% accuracy post-quantization

## EXPORT FORMAT FOR REACT
```
models/
├── best.pt (original)
├── model.onnx (ONNX Runtime compatible)
├── tfjs_model/
│   ├── model.json
│   └── group1-shard1of1.bin
└── metadata.json (class names, inference config)
```

## SUCCESS METRICS
- ✅ mAP@0.5 ≥ 0.85
- ✅ Inference time ≤ 100ms per frame (GPU)
- ✅ Recall for "Empty-Slot" class ≥ 0.92
- ✅ Model size ≤ 50MB (web-ready)
```

---

## PART 2: REACT FRONTEND PROMPT

### **React Frontend Application Prompt**

```markdown
# ShelfPulse AI - React Web Dashboard & Real-Time Detection Interface

## APPLICATION ARCHITECTURE

### Core Features (MVP)
1. **Real-Time Video Stream Processing**
   - Live webcam/IP camera feed ingestion
   - YOLOv8 inference on browser (ONNX Runtime)
   - Bounding box visualization with class labels
   - Real-time FPS counter

2. **Shelf Audit Dashboard**
   - SKU inventory grid view (visual representation)
   - Stock status: "In-Stock" (green), "Low-Stock" (yellow), "Out-of-Stock" (red)
   - Empty slot detection & flagging
   - Product loss calculator ($X opportunity cost per empty slot)

3. **Predictive Replenishment Engine**
   - Prophet-based forecast chart (next 7-14 days)
   - Depletion rate visualization
   - Replenishment recommendations
   - Weather & promo impact indicators

4. **Analytics & Reporting**
   - Daily OOS (Out-of-Stock) incidents
   - Revenue recovery opportunity (quantified)
   - Shelf fill rate trends
   - Top problem SKUs

5. **Settings & Configuration**
   - Camera source selection (webcam/IP)
   - Model confidence threshold slider
   - Class weight adjustment
   - Export audit logs (CSV/PDF)

## TECHNOLOGY STACK
- **Framework**: React 18+
- **State Management**: Zustand or Redux Toolkit
- **UI Library**: Tailwind CSS + shadcn/ui
- **ML Inference**: ONNX Runtime Web
- **Video Processing**: OpenCV.js (optional, for preprocessing)
- **Charts**: Recharts or Chart.js (Prophet forecasts)
- **API Communication**: TanStack Query + Axios

## COMPONENT STRUCTURE
```
src/
├── components/
│   ├── VideoStream/
│   │   ├── LiveCamera.jsx
│   │   ├── DetectionOverlay.jsx
│   │   └── VideoControls.jsx
│   ├── ShelfAudit/
│   │   ├── ShelfGrid.jsx
│   │   ├── SKUCard.jsx
│   │   └── StockStatusIndicator.jsx
│   ├── Dashboard/
│   │   ├── OOSAlerts.jsx
│   │   ├── RevenueLossCard.jsx
│   │   └── FillRateChart.jsx
│   ├── Forecasting/
│   │   ├── PredictiveChart.jsx
│   │   ├── ReplenishmentRecs.jsx
│   │   └── WeatherImpact.jsx
│   └── Settings/
│       ├── ModelConfig.jsx
│       ├── CameraSettings.jsx
│       └── ExportOptions.jsx
├── hooks/
│   ├── useVideoStream.js
│   ├── useONNXModel.js
│   ├── useDetections.js
│   └── usePredictions.js
├── store/
│   ├── detectionStore.js
│   ├── settingsStore.js
│   └── analyticsStore.js
├── utils/
│   ├── modelLoader.js
│   ├── videoProcessor.js
│   ├── bboxRenderer.js
│   └── calculators.js
└── services/
    ├── api.js (backend calls)
    ├── prophet.js (forecasting)
    └── analytics.js
```

## KEY USER WORKFLOWS

### Workflow 1: Real-Time Detection
```
User starts camera feed
  ↓
Load ONNX model from CDN/local
  ↓
Capture video frames (30 FPS)
  ↓
Run inference (ONNX Runtime)
  ↓
Render bounding boxes + confidence scores
  ↓
Log detections to state
  ↓
Update shelf grid visualization
```

### Workflow 2: Shelf Audit Generation
```
Run detection for 5 minutes (continuous)
  ↓
Aggregate detections per SKU
  ↓
Calculate stock status per location
  ↓
Flag empty slots & OOS items
  ↓
Generate audit report with timestamps
  ↓
Calculate opportunity cost ($)
  ↓
Export as JSON/CSV/PDF
```

### Workflow 3: Predictive Replenishment
```
User selects a SKU from dashboard
  ↓
Fetch historical sales data + Prophet forecast
  ↓
Factor in weather/promo signals
  ↓
Display depletion prediction chart
  ↓
Recommend restock qty & timing
  ↓
Alert if predicted OOS in <48 hours
```

## UI/UX SPECIFICATIONS

### Color Coding
- **Green (#10b981)**: In-Stock (>50% shelf capacity)
- **Yellow (#f59e0b)**: Low-Stock (20-50%)
- **Red (#ef4444)**: Out-of-Stock (0-20% or empty)
- **Gray (#6b7280)**: Unknown/Not detected

### Real-Time Metrics Display
- **Current FPS**: Top-right corner
- **Detection Count**: Active detections per frame
- **Inference Time**: ms per frame
- **Shelf Fill Rate**: % (real-time)
- **OOS Count**: Number of empty slots detected
- **Opportunity Cost**: $ loss in current view

### Detection Overlay
```
+--[Label: Coca-Cola-500ml]--+
|  Confidence: 94%             |
|  [Bounding Box]             |
|  Location: Shelf-A-Row-3     |
+-----------------------------+
```

## PERFORMANCE TARGETS
- ⚡ Inference: <100ms per frame (GPU), <300ms (CPU)
- 📊 Dashboard load: <2 seconds
- 🎥 Video feed latency: <500ms
- 💾 Model size: <50MB
- 🔋 Browser memory: <300MB


## DEPLOYMENT CHECKLIST
- ✅ ONNX model optimized & quantized
- ✅ Model hosted on CDN (Google Drive / Firebase)
- ✅ React app built & minified
- ✅ PWA manifest for offline capability
- ✅ Error boundaries for robustness
- ✅ Performance monitoring (Sentry)
```

---

## PART 3: COLAB ↔ REACT CONNECTION ARCHITECTURE

### Data Flow Diagram
```
Google Colab (Training)
    ↓
Export Models (ONNX + TensorFlow.js)
    ↓
Google Drive / Firebase Storage
    ↓
React App (Browser)
    ↓
Load Model from Cloud
    ↓
Run Inference Locally
    ↓
Send Results to Backend API
    ↓
Backend (Python/Node.js)
    ↓
Prophet Forecasting + Analytics
    ↓
Return Predictions to React
    ↓
Visualize in Dashboard
```

### Model Export Pipeline (Colab)
```python
# 1. Train YOLOv8
from ultralytics import YOLO
model = YOLO('yolov8m.pt')
results = model.train(data='shelf_data.yaml', epochs=100, imgsz=640)

# 2. Export to ONNX
model.export(format='onnx', imgsz=640, opset=14)

# 3. Export to TensorFlow.js
model.export(format='tfjs', imgsz=640)

# 4. Quantize & optimize
# Use onnxruntime.transformers.optimizer
onnx_model_path = 'runs/detect/train/weights/best.onnx'
# Quantization code here

# 5. Upload to Google Drive
from google.colab import drive
drive.mount('/content/drive')
!cp best.onnx /content/drive/MyDrive/ShelfPulse/models/
!cp -r runs/detect/train/weights/best_tfjs /content/drive/MyDrive/ShelfPulse/models/
```


---

## PART 4: IMPLEMENTATION SEQUENCE

### Phase 1: Data & Training (Week 1-2)
- [ ] Collect 500+ shelf images
- [ ] Annotate in YOLO format
- [ ] Train YOLOv8m in Colab
- [ ] Achieve mAP ≥ 0.85
- [ ] Export to ONNX & TFJS

### Phase 2: Backend API (Week 2-3)
- [ ] Set up Flask/FastAPI
- [ ] Create endpoints for audits, forecasts, replenishment
- [ ] Integrate Prophet for time-series
- [ ] Set up database (PostgreSQL/MongoDB)

### Phase 3: React Frontend (Week 3-4)
- [ ] Build video stream component
- [ ] Integrate ONNX Runtime for inference
- [ ] Create detection overlay
- [ ] Build shelf audit dashboard

### Phase 4: Integration & Optimization (Week 4-5)
- [ ] Connect React → Backend API
- [ ] Optimize model size (<50MB)
- [ ] Performance testing & profiling
- [ ] Deploy to production


## RESOURCES & TOOLS
- **Training**: Ultralytics YOLOv8, Google Colab
- **ML Frameworks**: PyTorch, TensorFlow
- **Forecasting**: Facebook Prophet
- **Web ML**: ONNX Runtime Web, TensorFlow.js
- **Frontend**: React 18, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, Flask, or Node.js + Express
- **Database**: PostgreSQL with TimescaleDB (time-series)
- **Storage**: Firebase Storage or Google Cloud Storage
- **Deployment**: Vercel (React), Railway/Render (Backend)


