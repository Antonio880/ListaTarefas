import React, { useEffect, useState } from "react";
import Favorites from "../components/catalogoFotos/components/Favorites";
import PhotoList from "../components/catalogoFotos/components/PhotoList";
import SearchBar from "../components/catalogoFotos/components/SearchBar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/ContextUser";
import axios from "axios";

function CatalogoFotos() {
  const [photos, setPhotos] = useState([]);
  const [loadPage, setLoadPage] = useState(true);
  const [photosFavorites, setPhotosFavorites] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  const navigate = useNavigate();
  const { user } = useUserContext();

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

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        const data = response.data.slice(0, 20);
        setPhotos(data);
        setFilteredPhotos(data);
        //console.log(photos);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Header user={user} navigate={navigate} />
      {/* <SearchBar onSearch={handleSearch}/> */}

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
