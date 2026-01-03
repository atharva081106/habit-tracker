import { useEffect, useState } from "react";
import API from "./api";

import Header from "./components/Header";
import AddHabit from "./components/AddHabit";
import HabitTable from "./components/HabitTable";
import LineChartView from "./components/LineChartView";
import Summary from "./components/Summary";

function App() {
  const [habits, setHabits] = useState([]);
  const [stats, setStats] = useState({
    success: 0,
    completed: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      const habitsRes = await API.get("/habits");
      const statsRes = await API.get("/stats");

      setHabits(habitsRes.data || []);
      setStats(statsRes.data || { success: 0, completed: 0, total: 0 });
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, color: "#9ca3af" }}>
        Loading Habit Tracker…
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 1400,
        margin: "auto",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Header success={stats.success} />

      {/* ADD HABIT */}
      <AddHabit onAdd={load} />

      {/* LINE CHART */}
      <div
        style={{
          marginTop: 20,
          background: "var(--panel)",
          padding: 20,
          borderRadius: 12,
        }}
      >
        <LineChartView habits={habits} />
      </div>

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: 20,
          marginTop: 20,
        }}
      >
        {/* HABIT TABLE */}
        <HabitTable habits={habits} setHabits={setHabits} />

        {/* SUMMARY */}
        <Summary stats={stats} />
      </div>

      {/* EMPTY STATE */}
      {habits.length === 0 && (
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            color: "#9ca3af",
          }}
        >
          <p>No habits yet. Add your first habit to get started 🚀</p>
        </div>
      )}
    </div>
  );
}

export default App;
