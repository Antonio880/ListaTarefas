import { Link } from "react-router-dom";
import React, { useState } from 'react';
import fetchUser from './Api';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = () => {
    handleLogin(username);
  };

  const handleLogin = async (username) => {
    const data = await fetchUser(username);
    setUser(data);
  };
  
  const handleEntrarClick = () => {
    if (user) {
      return (
        <Link to={'/Home'} state={user} style={{ textDecoration: "none", color: "inherit" }}>
          <button>Entrar</button>
        </Link>
      );
    }
  };

  return (
    <div class="App">
      <input
        type="text"
        placeholder="Digite seu username do GitHub"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button onClick={handleSubmit}>Cadastrar</button>
      {handleEntrarClick()}
    </div>
  );
};

export default LoginForm;
