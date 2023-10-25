import { Link } from "react-router-dom";
import UserDetails from "./ListaTarefas/UserDetails";
import { useUserContext } from "./ContextUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export default function Header() {
  const [loadPage, setLoadPage] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  return (
    <Navbar color="faded" light>
      <NavbarBrand className="me-auto">
        <Link
          to={"/Home"}
          className="nav-link"
          aria-current="page"
          onClick={() => setLoadPage(true)}
        >
          Home
        </Link>
      </NavbarBrand>
      <NavbarBrand id="Details">
        {user?.login && (
          <UserDetails username={user.login} avatarUrl={user.avatar_url} />
        )}
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} className="me-2" />
      <Collapse isOpen={!collapsed} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink>
              <Link
                to={"/ListaTarefas"}
                className="nav-link"
                aria-current="page"
              >
                Lista de Tarefas
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link
                aria-current="page"
                to={"/Catalogo"}
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
                to={"/Vendas"}
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
  );
}
