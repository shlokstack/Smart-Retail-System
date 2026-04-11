export default function DashboardPage({ stats }) {

  return (

    <div>

      <h1 className="text-2xl mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white/5 p-6 rounded-xl">
          <h3>Shelf Availability</h3>

          <p className="text-3xl mt-2">
            {stats.shelf_availability}%
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3>SKUs Detected</h3>

          <p className="text-3xl mt-2">
            {stats.skus_detected}
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3>Low Stock Alerts</h3>

          <p className="text-3xl mt-2">
            {stats.low_stock_alerts}
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3>Est. Sales Recovery</h3>

          <p className="text-3xl mt-2">
            ${stats.sales_recovery}
          </p>
        </div>

      </div>

    </div>

  );

}