import LoginForm from '../components/listaTarefas/LoginForm';
import React from 'react';

export default function TelaLogin() {

    const style = {
        "display":"flex", 
        "justifyContent": "center",
        
    }
    
    return(
        <>
            <div >
                <div style={{paddingTop: "180px", height: "700px"}}>
                    <h1 style={{fontSize: "30px", display: "flex", justifyContent: "center"}}>Login</h1>
                    <LoginForm />
                </div>
                <footer style={style} >
                    Feito por AntônioCruz©️
                </footer>
            </div>
        </>
    );
}