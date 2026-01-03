import API from "../api";
import HabitRow from "./HabitRow";

export default function HabitTable({ habits, setHabits }) {
  const days = Array.from({ length: 31 });

  const toggle = async (id, day) => {
    const res = await API.post(`/habits/${id}/toggle`, { day });
    setHabits(habits.map(h => (h.id === id ? res.data : h)));
  };

  return (
    <div style={{ background: "var(--panel)", padding: 20, borderRadius: 12 }}>
      <h3 style={{ marginBottom: 10 }}>Habits</h3>

      <table width="100%">
        <thead>
          <tr style={{ color: "var(--muted)" }}>
            <th align="left">Habit</th>
            <th>Goal</th>
            {days.map(d => (
              <th key={d}>{d}</th>
            ))}
            <th>Progress</th>
          </tr>
        </thead>

        <tbody>
          {habits.map(h => (
            <HabitRow key={h.id} habit={h} days={days} toggle={toggle} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
