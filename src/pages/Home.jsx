import UserDetails from "../components/listaTarefas/UserDetails";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"
import { useUserContext } from "../components/mercado/ContextUser";
export default function Home(){
    const location = useLocation();
    const user = location.state;
    const { setUser } = useUserContext();
    setUser(user);
    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <Link to={'/Home'} class="nav-link" state={user}>Home</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to={'/ListaTarefas'} class="nav-link" state={user}>Lista de Tarefas</Link>
                        <Link to={'/Catalogo'} class="nav-link" state={user}>Catálogo de Fotos</Link>
                        <Link to={'/Vendas'} class="nav-link" state={user}>Mercado</Link>
                    </ul>
                    <UserDetails username={user.login} avatarUrl={user.avatar_url}/>
                </div>
            </div>
        </nav>
    )
}