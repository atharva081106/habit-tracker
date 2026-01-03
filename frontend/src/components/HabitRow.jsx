export default function HabitRow({ habit, days, toggle }) {
  const progress = Math.round((habit.completed_days.length / habit.goal) * 100);

  return (
    <tr>
      <td>{habit.name}</td>
      <td align="center">{habit.goal}</td>

      {days.map((d) => {
  const done = habit.completed_days.includes(d);
  return (
    <td
      key={`${habit.id}-${d}`}
      onClick={() => toggle(habit.id, d)}
      style={{
        cursor: "pointer",
        background: done ? "var(--green)" : "#555",
        color: done ? "#000" : "transparent",
        textAlign: "center",
        borderRadius: 4,
      }}
    >
      ✓
    </td>
  );
})}


      <td>
        <div style={{ background: "#555", height: 8, borderRadius: 4 }}>
          <div
            style={{
              width: `${progress}%`,
              background: "var(--green)",
              height: "100%",
              borderRadius: 4,
            }}
          />
        </div>
      </td>
    </tr>
  );
}
