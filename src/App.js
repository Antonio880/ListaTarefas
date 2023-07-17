import React, { Children, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import UserDetails from './components/UserDetails';
import TaskCard from './components/TaskCard';
import fetchUser from './Api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [inicio, setInicio] = useState("inicio");
  const [id, setId] = useState(0);
  const [tasks, setTasks] = useState([
    {
      id: 0,
      content: 'Inicio'
    }
  ]);
  const [newTask, setNewTask] = useState('');
  
  useEffect(()=>{
    setTimeout(()=>{
      setInicio("sucess");
    }, 3000)
  }, [inicio])

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: setId(id+1),
        task: newTask,
        time: new Date().toLocaleTimeString("pt-BR"),
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  // const deleteTask = (index) => {
  //   const updatedTasks = task.filter((_, i) => i !== index);
  //   setTask(updatedTasks);
  // };

  const handleLogin = async (username) => {
    const data = await fetchUser(username);
    setUser(data);
    setInicio("login");
  };

  /*function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
  }*/

  return (
    <div className="App">
      <h2>Lista de Tarefas</h2>
      {!user ? (
        <div>
          <LoginForm onSubmit={handleLogin} />
        </div>
      ) : (
        inicio == "login" ? (
          <h1>Carregando</h1>
        ):(
          <div>
          <UserDetails username={user.login} avatarUrl={user.avatar_url} />
          
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task.task} time={task.time}></TaskCard>
          ))}
          <input type="text" value={newTask} onChange={(e)=> {setNewTask(e.target.value)}}/>
          <button onClick={addTask}>Adicionar</button>
          </div>
        )
      )}
    </div>
  );
};

export default App;