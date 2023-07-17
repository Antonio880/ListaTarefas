import React from 'react';

export function TaskCard ({ task, time }){
  const taskStyle = {
      'position': 'relative',
      'left': '33%',
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
    <div className="task-card" style={taskStyle}>
      <h3>{task}</h3>
      <p>{time}</p>
    </div>
  );
};

export default TaskCard;