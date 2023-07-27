import LoginForm from './components/listaTarefas/LoginForm';
import React from 'react';

export default function TelaLogin() {
    return(
        <>
            <div>
                <h1 style={{display:"flex", justifyContent: "center"}}>Login</h1>
                <LoginForm />
            </div>
        </>
    );
}