import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import fetchUser from './Api';

export function LoginForm() {
  const [user, setUser] = useState(null);
  const { register, handleSubmit, watch } = useForm();

  const username = watch("username");

  const handleLogin = async () => {
    const data = await fetchUser(username);
    setUser(data);
  };

  return (
    <form className="App" onSubmit={handleSubmit(handleLogin)}>
      <input
        type="text"
        placeholder="Digite seu username do GitHub"
        value={username}
        {...register("username", { required: true })}
      />
      <button type="submit" className="buttonTask" >Buscar</button>
      {user && (
        <Link to="/Home" state={user} style={{ textDecoration: "none", color: "inherit" }}>
          <button className="buttonTask">Entrar</button>
        </Link>
      )}
    </form>
  );
};

export default LoginForm;
