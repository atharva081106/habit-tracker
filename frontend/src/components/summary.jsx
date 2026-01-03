export default function Summary({ stats }) {
  const percent = stats.success;

  return (
    <div
      style={{
        background: "var(--panel)",
        padding: 20,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
      }}
    >
      <Donut label="Monthly Progress" value={percent} color="var(--green)" />
      <Donut label="Completion Ratio" value={Math.round((stats.completed / stats.total) * 100 || 0)} color="var(--yellow)" />
    </div>
  );
}

function Donut({ label, value, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `conic-gradient(${color} ${value * 3.6}deg, #444 0deg)`,
          margin: "auto",
        }}
      />
      <h3 style={{ marginTop: 10 }}>{value}%</h3>
      <p style={{ color: "var(--muted)" }}>{label}</p>
    </div>
  );
}
