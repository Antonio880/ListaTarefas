import { useUserContext } from "../components/ContextUser";
import { useNavigate } from "react-router-dom";
import UserData from "../components/Home/UserData";

import Header from "../components/Header";
import { useEffect } from "react";

export default function Home() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <div>
      <Header />

      <div style={{ display: "flex", justifyContent: "center" }}>
        Seja Bem Vindo {user.name}
        <UserData />
      </div>
    </div>
  );
}
