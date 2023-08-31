import { useLocation } from "react-router-dom";
import { useUserContext } from "../components/mercado/ContextUser";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Home(){
    const location = useLocation();
    const user = location.state;
    const { setUser } = useUserContext();
    const navigate = useNavigate();
    setUser(user);
    console.log(user)

    return(
        <div>
            <Header user={user} navigate={navigate}/>
            <div style={{display: "flex", justifyContent: "center"}}>
                Seja Bem Vindo {user.name} 
            </div>
        </div>
    )
}