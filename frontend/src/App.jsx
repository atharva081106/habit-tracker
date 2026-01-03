import { useEffect, useState } from "react";
import Header from "./components/Header";
import HabitTable from "./components/HabitTable";
import API from "./api";

function App() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const res = await API.get("/habits");
    setHabits(res.data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div style={{ padding: "20px", background: "#f9fafb" }}>
      <Header />
      <HabitTable habits={habits} setHabits={setHabits} />
    </div>
  );
}

export default App;
