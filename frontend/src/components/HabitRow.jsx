export default function HabitRow({ habit, days, toggleDay }) {
  const progress = Math.round(
    (habit.completed_days.length / habit.goal) * 100
  );

  return (
    <tr>
      <td>{habit.name}</td>
      <td>{habit.goal}</td>

      {days.map((_, idx) => {
        const day = idx + 1;
        const done = habit.completed_days.includes(day);

        return (
          <td
            key={idx}
            onClick={() => toggleDay(habit.id, day)}
            style={{
              cursor: "pointer",
              background: done ? "#22c55e" : "#e5e7eb",
              color: done ? "white" : "#555",
              textAlign: "center",
            }}
          >
            {done ? "✓" : ""}
          </td>
        );
      })}

      <td>
        <div style={{ background: "#e5e7eb", height: "10px" }}>
          <div
            style={{
              width: `${progress}%`,
              background: "#22c55e",
              height: "100%",
            }}
          />
        </div>
        <small>{progress}%</small>
      </td>
    </tr>
  );
}
