import { useEffect, useState } from "react";
import { fetchAlerts } from "../api";

interface Alert {
    id: number;
    product: string;
    stock_level: string;
    camera_id: string;
    status: string;
    priority: string;
    timestamp: string;
}

export default function AlertsPage() {

    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAlerts();

        // Auto refresh every 5 seconds
        const interval = setInterval(() => {
            loadAlerts();
        }, 5000);

        return () => clearInterval(interval);

    }, []);

    async function loadAlerts() {

        try {

            const data = await fetchAlerts();

            setAlerts(data);

            setLoading(false);

        } catch (error) {

            console.log("Error loading alerts:", error);

        }

    }

    function getPriorityColor(priority: string) {

        if (priority === "HIGH")
            return "#ef4444"; // red

        if (priority === "MEDIUM")
            return "#f59e0b"; // orange

        return "#22c55e"; // green

    }

    return (
        <div style={{ padding: "24px" }}>

            <h2 style={{ marginBottom: "20px" }}>
                🚨 Alerts Dashboard
            </h2>

            {loading && (
                <p>Loading alerts...</p>
            )}

            {!loading && alerts.length === 0 && (
                <p>No alerts yet</p>
            )}

            {alerts.map((alert) => (

                <div
                    key={alert.id}
                    style={{
                        padding: "16px",
                        marginBottom: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        background: "#fff"
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >

                        <b>{alert.product}</b>

                        <span
                            style={{
                                color:
                                    alert.status === "OPEN"
                                        ? "red"
                                        : "green"
                            }}
                        >
                            {alert.status}
                        </span>

                    </div>

                    <div>

                        Stock Level:
                        <b>
                            {" "}
                            {alert.stock_level}
                        </b>

                    </div>

                    <div>
                        Camera:
                        {" "}
                        {alert.camera_id}
                    </div>

                    <div>

                        Priority:
                        <span
                            style={{
                                color:
                                    getPriorityColor(
                                        alert.priority
                                    ),
                                fontWeight: "bold"
                            }}
                        >
                            {" "}
                            {alert.priority}
                        </span>

                    </div>

                    <div
                        style={{
                            fontSize: "12px",
                            color: "gray"
                        }}
                    >
                        {alert.timestamp}
                    </div>

                </div>

            ))}

        </div>
    );

}