import { useLocation } from "react-router-dom";
import { useUserContext } from "../components/mercado/ContextUser";
import { useNavigate } from "react-router-dom";
import UserDetails from "../components/listaTarefas/UserDetails";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import { useEffect, useState } from "react";

export default function Home(){
    //const location = useLocation();
    const [ loadPage, setLoadPage ] = useState(false)
    const [collapsed, setCollapsed] = useState(true);
    
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    
    const toggleNavbar = () => setCollapsed(!collapsed);

    useEffect(()=>{
        setUser(user);
    },[user])

    return(
        <div>
            {/* <Header user={user} navigate={navigate}/> */}
            <Navbar  color='faded' light>
                <NavbarBrand className="me-auto">  
                <Link
                    to={'/ListaTarefas'}
                    className="nav-link"
                    aria-current="page"
                    
                    onClick={() => setLoadPage(true)}
                    >
                    Home
                </Link>    
                </NavbarBrand>
                <NavbarBrand className="me-auto" id='Details'>
                {user?.login && (
                    <UserDetails username={user.login} avatarUrl={user.avatar_url} />
                )}
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="me-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav className="me-auto" navbar>
                    <NavItem>
                        <NavLink >
                        <Link
                            to={'/ListaTarefas'}
                            className="nav-link"
                            aria-current="page"
                            
                            >
                            Lista de Tarefas
                        </Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink >
                        <Link
                            aria-current="page"
                            onClick={() => navigate("/Catalogo")}
                            className="nav-link"
                            >
                            Catálogo de Fotos
                        </Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>
                        <Link
                            aria-current="page"
                            onClick={() => navigate("/Vendas")}
                            className="nav-link"
                            >
                            Vendas
                        </Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        onClick={() => {
                            setUser(null);
                            navigate("/");
                        }}
                        className="nav-link btn btn-danger"
                        >
                        Logout
                        </NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>

            <div style={{display: "flex", justifyContent: "center"}}>
                Seja Bem Vindo {user.name} 
            </div>
        </div>
    )
}