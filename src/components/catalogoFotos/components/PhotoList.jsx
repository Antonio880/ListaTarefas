import PhotoCard from "./PhotoCard"

export default function PhotoList({ photos, setPhotosFavorites, photosFavorites }){

    const photoList = {
        "display": "flex",
        "flexWrap": "wrap"
    }

    const toggleFavorite = (photoId) => {
        setPhotosFavorites((prevFavorites) =>
          prevFavorites.some((photo) => photo._id === photoId)
            ? prevFavorites.filter((photo) => photo._id !== photoId)
            : [...prevFavorites, photos.find((photo) => photo._id === photoId)]
        );
    };

    return (
        <div style={photoList}>
            {photos.slice(0, 20).map(photo => (
                <PhotoCard key={photo._id} photo={photo} isFavorite={photosFavorites.some((favPhoto) => favPhoto._id === photo._id)}
                toggleFavorite={toggleFavorite}/>
            ))}
        </div>
    )
}