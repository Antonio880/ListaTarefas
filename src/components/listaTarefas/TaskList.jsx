import TaskCard from "./TaskCard";
import { useState } from "react";

export default function TaskList( tasks, setTasks ){
    
    const [editingTask, setEditingTask] = useState(null);

    const toggleFavorite = (taskId) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
          )
        );
    };

    const handleRemoveProduct = (taskToRemove) => {
        const updatedList = tasks.filter(task => task.id !== taskToRemove.id);
        setTasks(updatedList);
    };

    const startEditingTask = (taskId) => {
        setEditingTask(taskId);
      };
    
      const saveEditedTask = (taskId, editedText) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, task: editedText } : task
          )
        );
        setEditingTask(null);
    };
    
    return(
        <div className='task-list'>
            {tasks && (
                tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    toggleFavorite={toggleFavorite}
                    task={task}
                    isCompleted={task.isCompleted}
                    onRemove={handleRemoveProduct}
                    onEdit={startEditingTask}
                    onSaveEdit={saveEditedTask}
                    isEditing={editingTask === task.id}
                  />
                ))
            )}
        </div>
    );
}