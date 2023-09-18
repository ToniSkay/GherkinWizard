import React from "react";
import "./HomeButtons.scss";
import { useNavigate } from "react-router-dom";

export function HomeButtons() {
  const navigate = useNavigate();

  return (
    <div className="home-buttons">
      <label>Create Task</label>
      <label onClick={() => navigate("/all-tasks")}>See Your Tasks</label>
    </div>
  );
}
