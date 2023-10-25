import { useForm } from "react-hook-form";
import fetchUser from "../components/ListaTarefas/Api";
import { useUserContext } from "../components/ContextUser";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

export default function TelaLogin() {
  const { register, handleSubmit, watch } = useForm();
  const { setUser } = useUserContext();
  const username = watch("username");
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/users";
  const handleLogin = async () => {
    try {
      const userData = await fetchUser(username);
      const existingUser = await axios.get(`${API_URL}/busca?githubId=${userData.id}`);
      if (existingUser.data.length === 0) {
        const newUser = {
          username: userData.login,
          githubId: userData.id,
        };
        await axios.post(API_URL, newUser);
      } 
      setUser(userData);
      navigate("/Home");
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
    }
  };

  const style = {
    display: "flex",
    justifyContent: "center",
  };
  return (
    <div className="App">
      <div>
        <div style={{ paddingTop: "180px", height: "700px" }}>
          <h1
            style={{
              fontSize: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Login
          </h1>
          <form
            className="App"
            onSubmit={handleSubmit(handleLogin)}
            style={{ height: "200px" }}
          >
            <input
              type="text"
              placeholder="Digite seu username do GitHub"
              value={username}
              {...register("username", { required: true })}
            />
            <button type="submit" className="buttonTask">
              Buscar
            </button>
          </form>
        </div>
        <footer style={style}>Feito por AntônioCruz©️</footer>
      </div>
    </div>
  );
}
