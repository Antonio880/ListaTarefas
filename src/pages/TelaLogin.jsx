
import { useForm } from 'react-hook-form';
import fetchUser from '../components/ListaTarefas/Api';
import { useUserContext } from '../components/ContextUser';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function TelaLogin() {
    const { register, handleSubmit, watch } = useForm();
    const { setUser } = useUserContext();
    const username = watch("username");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = await fetchUser(username);
        setUser(data);
        navigate("/Home");
    };

    const style = {
        "display":"flex", 
        "justifyContent": "center",
        
    }
    return(
        <div className="App">
            <div >
                <div style={{paddingTop: "180px", height: "700px"}}>
                    <h1 style={{fontSize: "30px", display: "flex", justifyContent: "center"}}>Login</h1>
                    <form className="App" onSubmit={handleSubmit(handleLogin)} style={{height: "200px"}} >
                        <input
                            type="text"
                            placeholder="Digite seu username do GitHub"
                            value={username}
                            {...register("username", { required: true })}
                        />
                        <button type="submit" className="buttonTask" >Buscar</button>
                        {/* {user && (
                            <button className="buttonTask">Entrar</button>
                        )} */}
                    </form>
                </div>
                <footer style={style} >
                    Feito por AntônioCruz©️
                </footer>
            </div>
        </div>
    );
}