import { Route, Routes } from 'react-router-dom';
import ListaTarefas from "./ListaTarefas";
import CatalogoFotos from "./CatalogoFotos";
import TelaLogin from "./TelaLogin";
import Home from './Home';
import Detail from './components/catalogoFotos/components/Detail';
export default function App(){
    return(
        <Routes>
          <Route path="*" element={<TelaLogin />} />
          <Route path="/" element={<TelaLogin />} />
          <Route path='/Home' exact element={<Home />}/>
          <Route path="/ListaTarefas" exact element={ <ListaTarefas /> } />
          <Route path="/Catalogo" exact element={ <CatalogoFotos /> } />
          <Route path="/Catalogo/photo/:id" exact element={ <Detail /> } />
        </Routes>
    );
}