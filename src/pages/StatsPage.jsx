import { useMemo } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAppContext } from "../context/AppContext";

function StatsPage() {
  const { chartData } = useAppContext();
  const totalInteractions = useMemo(
    () => chartData.reduce((acc, item) => acc + item.value, 0),
    [chartData]
  );

  const withPercent = useMemo(
    () =>
      chartData.map((item) => ({
        ...item,
        percent: totalInteractions ? Math.round((item.value / totalInteractions) * 100) : 0,
      })),
    [chartData, totalInteractions]
  );

  return (
    <section className="page-section">
      <div className="page-title-row">
        <h2 className="analytics-title">Friendship Analytics</h2>
      </div>

      <div className="chart-card card bg-base-100 shadow-sm analytics-chart-only">
        <div className="analytics-chart-wrap">
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                data={withPercent}
                cx="50%"
                cy="50%"
                innerRadius={88}
                outerRadius={140}
                dataKey="value"
                nameKey="name"
                paddingAngle={3}
                cornerRadius={8}
                stroke="#ffffff"
                strokeWidth={5}
              >
                {withPercent.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip formatter={(value, name) => [`${value} interactions`, name]} />

              <text x="50%" y="47%" textAnchor="middle" dominantBaseline="central" className="analytics-total-value">
                {totalInteractions}
              </text>
              <text x="50%" y="57%" textAnchor="middle" dominantBaseline="central" className="analytics-total-label">
                total logs
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default StatsPage;
