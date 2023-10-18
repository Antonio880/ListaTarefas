import React, { useEffect, useState } from "react";
import Favorites from "../components/catalogoFotos/components/Favorites";
import PhotoList from "../components/catalogoFotos/components/PhotoList";
import SearchBar from "../components/catalogoFotos/components/SearchBar";
import Header from "../components/Header";
import axios from "axios";

function CatalogoFotos() {
  const [photos, setPhotos] = useState([]);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = {
        title: file.name,
        url: reader.result,
        id: photos.length + 1, // Defina uma lógica para gerar IDs únicos
      };
      setPhotos([imageData, ...photos]);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
