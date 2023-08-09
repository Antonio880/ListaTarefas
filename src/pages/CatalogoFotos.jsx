import React, { useEffect, useState } from 'react';
import UserDetails from '../components/listaTarefas/UserDetails';
import Favorites from '../components/catalogoFotos/components/Favorites';
import PhotoList from '../components/catalogoFotos/components/PhotoList';
import SearchBar from '../components/catalogoFotos/components/SearchBar';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

function CatalogoFotos() {
  const [photos, setPhotos] = useState([]);
  const [loadPage, setLoadPage] = useState(true);
  const [photosFavorites, setPhotosFavorites] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  const location = useLocation();
  const user = location.state;

  
  const handleSearch = (searchTerm) => {
    if(searchTerm === ""){
      setFilteredPhotos(photos);
    }else{
      const filtered = photos.filter((photo) =>
      photo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPhotos(filtered);
    }
  };

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        const data = response.data.slice(0, 20);
        setPhotos(data);
        setFilteredPhotos(data);
        //console.log(photos);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
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
                        <button onClick={() => setLoadPage(!loadPage)} class="nav-link">Favorites</button>
                        <SearchBar onSearch={handleSearch}/>
                    </ul>
                    <UserDetails username={user.login} avatarUrl={user.avatar_url}/>
                </div>
            </div>
        </nav>
    {loadPage?(
      <div>
        <PhotoList photos={filteredPhotos} setPhotosFavorites={setPhotosFavorites} photosFavorites={photosFavorites}/>
      </div>
    ):(
      <div>
        <Favorites setPhotosFavorites={setPhotosFavorites} photosFavorites={photosFavorites}/>
      </div>
    )}
    </div>
  );
}

export default CatalogoFotos;
