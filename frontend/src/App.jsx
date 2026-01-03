import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");

  const fetchHabits = async () => {
    const res = await API.get("/habits");
    setHabits(res.data);
  };

  const addHabit = async () => {
    if (!name) return;
    await API.post("/habits", { name });
    setName("");
    fetchHabits();
  };

  const completeHabit = async (id) => {
    await API.post(`/habits/${id}/complete`);
    fetchHabits();
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🔥 Habit Tracker</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Enter habit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addHabit} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

      {habits.map((habit) => (
        <div
          key={habit.id}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        >
          <strong>{habit.name}</strong>
          <p>🔥 Streak: {habit.streak}</p>
          <button onClick={() => completeHabit(habit.id)}>
            Mark Done Today
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
