import { Link } from "react-router-dom";

export default function PhotoCard({ photo, isFavorite, toggleFavorite }) {
  const photoStyle = {
    height: "170px",
    width: "170px",
  };

  const styleCard = {
    flexBasis: "18%",
    margin: "8px",
    position: "relative",
    background: "none",
    border: "none",
    color: "inherit",
    font: "inherit",
    cursor: "pointer",
    outline: "none",
  };

  const handleFavoriteClick = () => {
    toggleFavorite(photo.id);
  };

  return (
    <button style={styleCard}>
      <Link to={`photo/${photo.id}`} state={photo}>
        <img src={photo.url} alt={photo.title} style={photoStyle} />
        <h3 style={{ fontSize: "15px" }}>{photo.title}</h3>
      </Link>
      {!isFavorite ? (
        <span onClick={handleFavoriteClick}>✩</span>
      ) : (
        <span onClick={handleFavoriteClick}>🌟</span>
      )}
    </button>
  );
}
