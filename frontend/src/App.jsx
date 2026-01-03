import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchHabits = async () => {
    try {
      setLoading(true);
      const res = await API.get("/habits");
      setHabits(res.data);
    } catch (err) {
      setError("Failed to load habits");
    } finally {
      setLoading(false);
    }
  };


  const addHabit = async () => {
    if (!name) return;

    try {
      setLoading(true);
      await API.post("/habits", { name });
      setName("");
      fetchHabits();
    } catch (err) {
      setError("Habit already exists or server error");
    } finally {
      setLoading(false);
    }
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
      {loading && <p>⏳ Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}


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
