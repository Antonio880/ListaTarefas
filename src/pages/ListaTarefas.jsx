import React, { useState, useEffect } from 'react';
import TaskCard from '../components/listaTarefas/TaskCard';
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../components/mercado/ContextUser';
import UserDetails from "../components/listaTarefas/UserDetails"
import { Link } from 'react-router-dom';
import Completed from '../components/listaTarefas/Completed';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


function ListaTarefas() {
  const [loadPage, setLoadPage] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const toggleNavbar = () => setCollapsed(!collapsed);

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
  
  useEffect(() => {
    //console.log("Executando useEffect");
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    if(tasksFromLocalStorage){
      setTasks(tasksFromLocalStorage);
    }else{
      setTasks([
        {
          id:0
        }
      ])
    }
  }, []);

  useEffect(() => {
    // Atualize o localStorage sempre que as tarefas forem alteradas
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleRemoveProduct = (taskToRemove) => {
    const updatedList = tasks.filter(task => task.id !== taskToRemove.id);
    setTasks(updatedList);
  };
  
  const addTask = () => {
    if (newTask.trim() !== '' && selectedCategory.trim() !== '') {
      const id = Date.now(); // Gere um ID único com base no horário atual
      const newTaskObject = {
        id: id,
        task: newTask,
        time: new Date().toLocaleTimeString("pt-BR"),
        isCompleted: false,
        category: selectedCategory
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  const toggleFavorite = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.isCompleted);

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     addTask(); // Chame a função addTask quando a tecla Enter for pressionada
  //     console.log("Enter")
  //   }
  // };

  return (
    <div className="App">
      <Navbar  color='faded' light>
        <NavbarBrand className="me-auto">  
          <Link
            to={'/Home'}
            className="nav-link"
            aria-current="page"
            
            >
              Home
          </Link>    
        </NavbarBrand>
        <NavbarBrand className="me-auto" id='Details'>
          {user?.login && (
            <UserDetails username={user.login} avatarUrl={user.avatar_url} />
          )}
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="me-auto" navbar>
            <NavItem>
                <NavLink >
                  <Link
                    to={'/Home'}
                    className="nav-link"
                    aria-current="page"
                    >
                      Home
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink >
                  <Link
                    aria-current="page"
                    onClick={() => setLoadPage(!loadPage)}
                    className="nav-link"
                    >
                      Tasks Completed  
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink >
                  <Link
                    aria-current="page"
                    to={'/Catalogo'}
                    className="nav-link"
                    >
                      Catálogo de Fotos
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link
                    aria-current="page"
                    to={'/Vendas'}
                    className="nav-link"
                    >
                      Vendas
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    setUser(null);
                    navigate("/");
                  }}
                  className="nav-link btn btn-danger"
                  >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
      </Navbar>
      
      <h3>Lista de Tarefas</h3>
      <div>
        {loadPage ? (
          <div >
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
            <div className='container text-center' >
              <div className='row' style={{display:'flex',justifyContent:'center'}}>
                <div className='col-md-8'>
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => { setNewTask(e.target.value) }}
                    
                  />
                </div>
                <div class="col-md-8">
                  <select 
                  class="form-select" 
                  id="inputGroupSelect02"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='form-select'
                  >
                    <option selected >Categories</option>
                    <option value="Work">Work</option>
                    <option value="Studing">Studing</option>
                    <option value="Hobbie">Hobbie</option>
                  </select>
                  
                </div> 
                <div className='col-md-8'>
                  <button onClick={addTask} className='buttonTask'>Adicionar</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Completed completedTasks={completedTasks} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaTarefas;
