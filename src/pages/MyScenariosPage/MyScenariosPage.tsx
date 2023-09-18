import React from "react";
import "./MyScenariosPage.scss";
import { mock } from "./constants/mock-data";
import { Scenario } from "./components/Scenario/Scenario";

export function MyScenariosPage() {
  return (
    <div className="all-tasks-container">
      {mock.map((task) => (
        <Scenario key={task.id} {...task}></Scenario>
      ))}
    </div>
  );
}
