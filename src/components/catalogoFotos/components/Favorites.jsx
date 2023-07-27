import React from "react";
import PhotoCard from "./PhotoCard";

export default function Favorites({ photosFavorites, setPhotosFavorites }) {
  const removeFromFavorites = (photoId) => {
    setPhotosFavorites((prevFavorites) =>
      prevFavorites.filter((photo) => photo.id !== photoId)
    );
  };

  const photoList = {
    display: "flex",
    flexWrap: "wrap",
  };

  return (
    <div>
      <h2>Favorites</h2>
      {photosFavorites.length === 0 ? (
        <p>No favorite photos yet.</p>
      ) : (
        <div style={photoList}>
          {photosFavorites.map((photo) => (
            <div key={photo.id}>
              <PhotoCard photo={photo} isFavorite={true} toggleFavorite={removeFromFavorites} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
