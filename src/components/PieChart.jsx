import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

function OverallData({ data }) {
  const totalIntake = data.reduce((sum, d) => sum + Number(d.calorieIntake || 0), 0);
  const totalBurned = data.reduce((sum, d) => sum + Number(d.calorieBurned || 0), 0);

  const pieData = [
    { name: "Calorie Intake", value: totalIntake },
    { name: "Calorie Burned", value: totalBurned }
  ];

  return (
    <div className="chart-card pie-card">
      <h2>Overall Data</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"  paddingAngle={3}>
            <Cell fill="#8b5cf6" />
            <Cell fill="#22c55e" />
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OverallData;