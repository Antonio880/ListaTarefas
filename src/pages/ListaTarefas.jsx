import React, { useState, useEffect } from "react";
import TaskList from "../components/ListaTarefas/TaskList";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/ContextUser";
import Header from "../components/Header";
import Completed from "../components/ListaTarefas/Completed";
import axios from "axios";

function ListaTarefas() {
  const [loadPage, setLoadPage] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useUserContext();
  const [userGitHub, setUserGitHub] = useState({});
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/tarefas";

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response);
      if (response.data) {
        setTasks(verificaTasksUsuario(response.data));
      } else {
        setTasks([
          {
            id: 0,
          },
        ]);
      }
    } catch (error) {
      console.error("Erro ao buscar as tarefas: ", error);
    }
  };

  const verificaTasksUsuario = (data) => {
    let tasksUser = [];
    data.forEach((tarefa) => {
      
      if (tarefa.user && Number(tarefa.user.githubId) === user.id) {
        tasksUser.push(tarefa);
        
      }
    });
    return tasksUser;
  };

  const fetchUser = async () => {
    try{
      const response = await axios.get(`http://localhost:3001/users/busca?githubId=${user.id}`)
      setUserGitHub(response.data[0]);
      //console.log(userGitHub);
    }catch (error) {
      console.error("Erro ao buscar as tarefas: ", error);
    }
    //setUserGitHub(user);
  }

  useEffect(() => {
    fetchUser().then(() => fetchTasks());
  }, []);

  const addTask = async () => {
    if (newTask.trim() !== "" && selectedCategory.trim() !== "") {
      const newTaskObject = {
        task: newTask,
        time: new Date().toLocaleTimeString("pt-BR"),
        isCompleted: false,
        category: selectedCategory,
        user: userGitHub._id
      };
      await axios
        .post(API_URL, newTaskObject)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      const response = await axios.get(
        `http://localhost:3001/tarefas/busca?task=${newTaskObject.task}`
      );
      console.log(response);
      newTaskObject._id = response.data[0]._id;
      
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="App">
      <Header />

      <h3>Lista de Tarefas</h3>
      <div>
        {loadPage ? (
          <div>
            <TaskList tasks={tasks} setTasks={setTasks} />
            <div className="fab" ontouchstart="">
              <button className="main" onClick={() => setLoadPage(!loadPage)} />
            </div>
            <div className="container text-center">
              <div
                className="row"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="col-md-8">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => {
                      setNewTask(e.target.value);
                    }}
                  />
                </div>
                <div class="col-md-12">
                  <select
                    class="form-select"
                    id="inputGroupSelect02"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="form-select"
                    defaultValue="Nenhum"
                  >
                    <option selected >Categories</option>
                    <option value="Work">Work</option>
                    <option value="Studing">Studing</option>
                    <option value="Hobbie">Hobbie</option>
                  </select>
                </div>
                <div className="col-md-8">
                  <button onClick={addTask} className="buttonTask">
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="fab" onTouchStart="">
              <button className="main" onClick={() => setLoadPage(!loadPage)} />
            </div>
            <Completed completedTasks={completedTasks} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaTarefas;
