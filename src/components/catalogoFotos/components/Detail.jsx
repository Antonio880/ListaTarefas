import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Detail(){
    
    const location = useLocation();
    const photo = location.state;
    
    //console.log(photo);
    return (
        <div style={{display:"flex", flexDirection: 'column', alignItems: "center",justifyContent: "center"}}>
            <h2>Descrição da Imagem clicada</h2>
            <p>{photo.name}</p>
            <Link to={`/Catalogo`} state={{}}>
                <button class="btn btn-outline-success">Voltar</button>
            </Link>
        </div>
    );
} 