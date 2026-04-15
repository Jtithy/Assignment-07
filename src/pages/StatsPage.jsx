import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAppContext } from "../context/AppContext";

function StatsPage() {
  const { chartData } = useAppContext();

  return (
    <section className="page-section">
      <div className="page-title-row">
        <h2>Friendship Analytics</h2>
      </div>

      <div className="chart-card">
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={78}
              outerRadius={132}
              dataKey="value"
              paddingAngle={4}
              label
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default StatsPage;
