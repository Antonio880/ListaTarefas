import React, { useState, useEffect } from "react";
import TaskList from "../../components/ListaTarefas/TaskList";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../components/ContextUser";
import Header from "../../components/Header";
import Completed from "../../components/ListaTarefas/Completed";

function ListaTarefas() {
  const [loadPage, setLoadPage] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    //console.log("Executando useEffect");
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
    if (tasksFromLocalStorage) {
      setTasks(tasksFromLocalStorage);
    } else {
      setTasks([
        {
          id: 0,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    // Atualize o localStorage sempre que as tarefas forem alteradas
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "" && selectedCategory.trim() !== "") {
      const id = Date.now(); // Gere um ID único com base no horário atual
      const newTaskObject = {
        id: id,
        task: newTask,
        time: new Date().toLocaleTimeString("pt-BR"),
        isCompleted: false,
        category: selectedCategory,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="App">
      <Header user={user} navigate={navigate} />

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
                <div class="col-md-8">
                  <select
                    class="form-select"
                    id="inputGroupSelect02"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="form-select"
                  >
                    <option selected>Categories</option>
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
            <div className="fab" ontouchstart="">
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
