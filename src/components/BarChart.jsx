import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

function WeeklyTrends({ data }) {
  if (!data.length) return null;

  const datedData = data
    .filter((item) => item.date)
    .sort((first, second) => first.date.localeCompare(second.date));
  const latestDay = new Date();
  latestDay.setHours(0, 0, 0, 0);
  const firstDay = new Date(latestDay);
  firstDay.setDate(firstDay.getDate() - 6);
  const lastWeekData = datedData.filter((item) => {
    const itemDate = new Date(`${item.date}T00:00:00`);
    return itemDate >= firstDay && itemDate <= latestDay;
  });

  if (!lastWeekData.length) return null;

  return (
    <div className="chart-card">
      <h2>Weekly Health Trends</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={lastWeekData} barCategoryGap="25%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.45} />
          <XAxis dataKey="date" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #334155",
              borderRadius: "0px",
              color: "#000000",
            }}
          />
          <Bar dataKey="calorieIntake" fill="#8b5cf6" radius={[0, 0, 0, 0]} maxBarSize={45} />
          <Bar dataKey="calorieBurned" fill="#22c55e" radius={[0, 0, 0, 0]} maxBarSize={45} />
                  <Legend verticalAlign="bottom" height={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyTrends;