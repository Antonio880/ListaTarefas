import React from 'react';

export function TaskCard ({ task, time }){
  const taskStyle = {
      'position': 'relative',
      'left': '33%',
      'font-size': '12px',
      'padding-left': '2%',
      "height": '30px',
      'width': '30%',    
      'background': '#735bf2',
      'color': '#fff',
      'border-radius': '10px',
      'margin-bottom': '10px',
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      'padding': '24px'
  }
  
  return (
  <div>
    {task ? (
      <div className="task-card" style={taskStyle}>
        <h5>{task}</h5>
        <p>{time}</p>
      </div>
    ) : (
      <h3>Inicio</h3>
    )}
  </div>
  );
};

export default TaskCard;