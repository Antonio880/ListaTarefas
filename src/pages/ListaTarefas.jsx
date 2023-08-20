import React, { useState } from 'react';
import UserDetails from '../components/listaTarefas/UserDetails';
import TaskCard from '../components/listaTarefas/TaskCard';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useUserContext } from '../components/mercado/ContextUser';
import '../App.css';

function ListaTarefas() {
  const [id, setId] = useState(0);
  const [tasks, setTasks] = useState([
    {
      id: 0,
    }
  ]);
  const [newTask, setNewTask] = useState('');
  const location = useLocation();
  const user = location.state;
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  
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

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <Link to={'/Home'} class="nav-link" state={user}>Home</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to={'/ListaTarefas'} class="nav-link" state={user}>Lista de Tarefas</Link>
                        <Link to={'/Catalogo'} class="nav-link" state={user}>Catálogo de Fotos</Link>
                        <Link to={'/Vendas'} class="nav-link" state={user}>Mercado</Link>
                    </ul>
                    <UserDetails username={user.login} avatarUrl={user.avatar_url}/>
                </div>
            </div>
        </nav>
        <button type="button" style={{position: 'absolute', top: "2%", left:"93%"}} onClick={()=>{
                      setUser(null);
                      navigate("/");
                    }} class="btn btn-danger">Logout</button>
      <h3>Lista de Tarefas</h3>
        <div>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task.task} time={task.time}></TaskCard>
          ))}
          <input type="text" value={newTask} onChange={(e)=> {setNewTask(e.target.value)}}/>
          <button onClick={addTask} className='buttonTask'>Adicionar</button>
        </div>
    </div>
  );
};

export default ListaTarefas;