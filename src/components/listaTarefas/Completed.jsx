import React from "react";

export default function Completed({ completedTasks }) {

  return (
    <div className="task-list">
    <h5>Tarefas Completas</h5>
    {completedTasks.map((task) => (
      <div key={task.id} className="task-card" style={{fontSize: "18px"}}>
        <p>{task.task}</p>
        <p>{task.time}</p>
        <p>{task.category}</p>
      </div>
    ))}
  </div>
  );
}
