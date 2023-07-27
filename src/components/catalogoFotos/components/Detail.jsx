import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Detail(){
    const [description, setDescription] = useState("");

    const location = useLocation();
    const photo = location.state;
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/photos/${photo.id}`)
          .then(response => {
            const data = response.data.title;
            setDescription(data);
            //console.log(photos);
          })
          .catch(error => console.log(error));
      }, []);

    //console.log(photo);
    return (
        <div style={{display:"flex", flexDirection: 'column', alignItems: "center",justifyContent: "center"}}>
            <h2>Descrição da Imagem clicada</h2>
            <p>{description}</p>
            <Link to={`/`} state={{}}>
                <button class="btn btn-outline-success">Voltar</button>
            </Link>
        </div>
    );
} 