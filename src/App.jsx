import { Route, Routes } from 'react-router-dom';
import ListaTarefas from "./pages/ListaTarefas";
import CatalogoFotos from "./pages/CatalogoFotos";
import TelaLogin from "./pages/TelaLogin";
import Home from './pages/Home';
import Detail from './components/catalogoFotos/components/Detail';
import DetailStore from "./components/mercado/DetailStore"
import Vendas from './pages/Vendas';
import Tempo from './pages/Tempo';
export default function App(){
    return(
        <Routes>
          <Route path="*" element={<TelaLogin />} />
          <Route path="/" element={<TelaLogin />} />
          <Route path='/Home' exact element={<Home />}/>
          <Route path="/ListaTarefas" exact element={ <ListaTarefas /> } />
          <Route path="/Catalogo" exact element={ <CatalogoFotos /> } />
          <Route path="/Catalogo/photo/:id" exact element={ <Detail /> } />
          <Route path="/Vendas/product/:id" exact element={ <DetailStore /> } />
          <Route path="/Vendas" exact element={ <Vendas /> } />
          <Route path='/Tempo' exact element={ <Tempo/> }/>
        </Routes>
    );
}

/*import { Outlet } from "react-router-dom";

function App(){
    return(
        //dentro desse outlet, ele renderiza o componente de determinada rota
        <Outlet />
    )
}
export default App;*/