import PhotoCard from "./PhotoCard"

export default function PhotoList({ photos, setPhotosFavorites, photosFavorites }){

    const photoList = {
        "display": "flex",
        "flexWrap": "wrap"
    }

    const toggleFavorite = (photoId) => {
        setPhotosFavorites((prevFavorites) =>
          prevFavorites.some((photo) => photo.id === photoId)
            ? prevFavorites.filter((photo) => photo.id !== photoId)
            : [...prevFavorites, photos.find((photo) => photo.id === photoId)]
        );
    };

    return (
        <div style={photoList}>
            {photos.slice(0, 20).map(photo => (
                <PhotoCard key={photo.id} photo={photo} isFavorite={photosFavorites.some((favPhoto) => favPhoto.id === photo.id)}
                toggleFavorite={toggleFavorite}/>
            ))}
        </div>
    )
}