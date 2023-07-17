// LoginForm.js
import React, { useState } from 'react';

export function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite seu username do GitHub"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
