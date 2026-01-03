import HabitRow from "./HabitRow";
import API from "../api";

export default function HabitTable({ habits, setHabits }) {
  const days = Array.from({ length: 31 });

  const toggleDay = async (habitId, day) => {
    const res = await API.post(`/habits/${habitId}/toggle`, { day });
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? res.data : h))
    );
  };

  return (
    <table border="1" cellPadding="6" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Habit</th>
          <th>Goal</th>
          {days.map((_, i) => (
            <th key={i}>{i + 1}</th>
          ))}
          <th>Progress</th>
        </tr>
      </thead>
      <tbody>
        {habits.map((habit) => (
          <HabitRow
            key={habit.id}
            habit={habit}
            days={days}
            toggleDay={toggleDay}
          />
        ))}
      </tbody>
    </table>
  );
}
