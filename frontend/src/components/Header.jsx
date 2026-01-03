export default function Header({ success }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h1>Monthly Habit Tracker</h1>
        <p style={{ color: "var(--muted)" }}>📅 July 2023</p>
      </div>

      <div style={{ textAlign: "right" }}>
        <h2 style={{ color: "var(--green)", fontSize: 36 }}>{success}%</h2>
        <p style={{ color: "var(--muted)" }}>SUCCESS RATE</p>
      </div>
    </div>
  );
}
