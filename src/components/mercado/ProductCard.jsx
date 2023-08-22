import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onRemove, onUpdate, setOnUpdate }){
  const { name, quantify, unitPrice } = product;

  const productStyle = {
    'position': 'relative',
      'left': '0%',
      'font-size': '12px',
      'padding-left': '5%',
      "height": '30px',
      'width': '500px',    
      'background': '#735bf2',
      'color': '#fff',
      'border-radius': '10px',
      'margin-bottom': '10px',
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      'padding': '24px'
  }

  const handleRemoveClick = () => {
    onRemove(product); // Chama a função de remoção quando o botão for clicado
  };

  return (
    <li className="product-card" style={{display: "flex", alignItems: "center"}}>
      <div style={productStyle}>
        <label onClick={handleRemoveClick}>🗑️</label>
        <h3>{name}</h3>
        <p>Quantidade: {quantify}</p>
        <p>Valor Unitário: R${parseFloat(unitPrice).toFixed(2)}</p>
        <Link to={`product/${product.id}`} state={product}>
          <button class="btn btn-secondary" style={{color:"whitesmoke"}} onClick={() => {setOnUpdate(!onUpdate)}}>
              Edit
          </button>
        </Link>
      </div>
    </li>
  );
};

/*.toFixed(2)*/
