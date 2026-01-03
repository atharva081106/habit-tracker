export default function LineChartView({ habits }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const values = days.map(day =>
    habits.reduce(
      (sum, h) => sum + (h.completed_days?.includes(day) ? 1 : 0),
      0
    )
  );

  const max = Math.max(...values, 1);

  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>Daily Consistency</h3>

      <svg width="100%" height="220" viewBox="0 0 1000 220">
        {values.map((v, i) => {
          const x = (i / 30) * 980 + 10;
          const y = 200 - (v / max) * 180;

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#22c55e"
            />
          );
        })}

        <polyline
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          points={values
            .map((v, i) => {
              const x = (i / 30) * 980 + 10;
              const y = 200 - (v / max) * 180;
              return `${x},${y}`;
            })
            .join(" ")}
        />
      </svg>
    </div>
  );
}
