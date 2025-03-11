import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart, CartesianGrid } from "recharts";
import storesData from "../mockdata/stores.json";
import calendarData from "../mockdata/calendar.json";
import planningData from "../mockdata/planning.json";
import skusData from "../mockdata/skus.json";

const ChartsPage: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState(storesData[0].ID);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const computeChartData = () => {
      const weeklyData: Record<string, { week: string; gmDollars: number; gmPercent: number; salesDollars: number }> = {};

      calendarData.forEach((week) => {
        weeklyData[week.Week] = { week: week["Week Label"], gmDollars: 0, gmPercent: 0, salesDollars: 0 };
      });

      skusData.forEach((sku) => {
        calendarData.forEach((week) => {
          const salesEntry = planningData.find((p) => p.Store === selectedStore && p.SKU === sku.ID && p.Week === week.Week);
          if (salesEntry) {
            const salesUnits = salesEntry["Sales Units"] || 0;
            const salesDollars = salesUnits * sku.Price;
            const gmDollars = salesDollars - salesUnits * sku.Cost;

            weeklyData[week.Week].gmDollars += gmDollars;
            weeklyData[week.Week].salesDollars += salesDollars;
          }
        });
      });

      Object.values(weeklyData).forEach((entry) => {
        entry.gmPercent = entry.salesDollars !== 0 ? (entry.gmDollars / entry.salesDollars) * 100 : 0;
      });

      setChartData(Object.values(weeklyData));
    };

    computeChartData();
  }, [selectedStore]);

  return (
    <div className="p-4 w-full">
      <select
        className="p-2 border rounded mb-4"
        value={selectedStore}
        onChange={(e) => setSelectedStore(e.target.value)}
      >
        {storesData.map((store) => (
          <option key={store.ID} value={store.ID}>
            {store.Label}
          </option>
        ))}
      </select>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis dataKey="week" stroke="#ccc" />
            <YAxis yAxisId="left" stroke="#ccc" tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <YAxis yAxisId="right" orientation="right" stroke="#ff7300" tickFormatter={(value) => `${value.toFixed(0)}%`} />
            <Tooltip formatter={(value: number, name) => name == "GM Dollars" ? `$${value.toLocaleString()}` : `${value.toLocaleString()}%`} />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar yAxisId="left" dataKey="gmDollars" fill="#4A90E2" name="GM Dollars" />
            <Line yAxisId="right" type="monotone" dataKey="gmPercent" stroke="#ff7300" strokeWidth={2} name="GM %" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsPage;
