import React, { useEffect, useState } from "react";
import Favorites from "../components/catalogoFotos/components/Favorites";
import PhotoList from "../components/catalogoFotos/components/PhotoList";
import SearchBar from "../components/catalogoFotos/components/SearchBar";
import Header from "../components/Header";
import axios from "axios";
import api from "../config/configApi"

function CatalogoFotos() {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState('');
  const [loadPage, setLoadPage] = useState(true);
  const [photosFavorites, setPhotosFavorites] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredPhotos(photos);
    } else {
      const filtered = photos.filter((photo) =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPhotos(filtered);
    }
  };


  const handleFileChange = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    console.log(formData);
    await api.post("/upload-image", formData);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/pictures")
      .then((response) => {
        const data = response.data;
        setPhotos(data);
        console.log(data);
        setFilteredPhotos(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} onFileUpload={handleFileChange} />
      <form onSubmit={handleFileChange}>
        <label>Imagem: </label>
        <input type="file" name="image"  /><br /><br />
        <button type="submit">Salvar</button>
      </form>
      {loadPage ? (
        <div>
          <PhotoList
            photos={filteredPhotos}
            setPhotosFavorites={setPhotosFavorites}
            photosFavorites={photosFavorites}
          />
        </div>
      ) : (
        <div>
          <Favorites
            setPhotosFavorites={setPhotosFavorites}
            photosFavorites={photosFavorites}
          />
        </div>
      )}
    </div>
  );
}

export default CatalogoFotos;
