import { useState } from "react";
import API from "../api";

export default function AddHabit({ onAdd }) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const submit = async () => {
    if (!name || !goal) return;

    await API.post("/habits", {
      name,
      goal: Number(goal),
    });

    setName("");
    setGoal("");
    onAdd();
  };

  return (
    <div
      style={{
        background: "var(--panel)",
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        display: "flex",
        gap: 10,
      }}
    >
      <input
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        style={inputStyle}
      />

      <button onClick={submit} style={buttonStyle}>
        Add
      </button>
    </div>
  );
}

const inputStyle = {
  flex: 1,
  padding: 8,
  borderRadius: 6,
  border: "none",
};

const buttonStyle = {
  padding: "8px 16px",
  borderRadius: 6,
  border: "none",
  background: "#22c55e",
  cursor: "pointer",
};
