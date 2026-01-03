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
        <button onClick={addHabit} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {habits.map((habit) => (
          <div
            key={habit.id}
            style={{
            padding: "15px",
            borderRadius: "8px",
            background: "#ffffff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            marginBottom: "12px",
          }}
  >
          <h3 style={{ margin: "0 0 8px 0" }}>{habit.name}</h3>

          <p style={{ margin: "4px 0" }}>
              🔥 Streak: <strong>{habit.streak}</strong>
          </p>

          <button onClick={() => completeHabit(habit.id)}>
            Mark Done Today
          </button>
        </div>
      ))}

    </div>
  );
}

export default App;
