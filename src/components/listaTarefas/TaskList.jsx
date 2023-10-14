import TaskCard from "./TaskCard";
import { useState } from "react";
import axios from "axios";

export default function TaskList({ tasks, setTasks }){
    
    const [editingTask, setEditingTask] = useState(null);

    const toggleFavorite = async (taskClicked) => {
      await axios.put(`http://localhost:3001/tarefas/${taskClicked._id}`,{
        "isCompleted": !taskClicked.isCompleted
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskClicked._id ? { ...task, isCompleted: !task.isCompleted } : task
          )
        );
    };

    const handleRemoveProduct = async (idTaskToRemove) => {
      console.log(idTaskToRemove);
      await axios.delete(`http://localhost:3001/tarefas/${idTaskToRemove}`);
      const updatedList = tasks.filter(task => task._id !== idTaskToRemove);
      setTasks(updatedList);
    };

    const startEditingTask = (taskId) => {
        setEditingTask(taskId);
      };
    
      const saveEditedTask = async (taskId, editedText) => {
        await axios.put(`http://localhost:3001/tarefas/${taskId}`,{
        "task": editedText
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, task: editedText } : task
          )
        );
        setEditingTask(null);
    };
    
    return(
        <div className='task-list'>
            {tasks && (
                tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    toggleFavorite={toggleFavorite}
                    task={task}
                    isCompleted={task.isCompleted}
                    onRemove={handleRemoveProduct}
                    onEdit={startEditingTask}
                    onSaveEdit={saveEditedTask}
                    isEditing={editingTask === task._id}
                  />
                ))
            )}
        </div>
    );
}