import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onRemove }){
  const { name, quantify, unitPrice } = product;

  return (
    <li className="product-card">
      <label onClick={onRemove(product)}>🗑️</label>
      <h3>{name}</h3>
      <p>Quantidade: {quantify}</p>
      <p>Valor Unitário: R${parseFloat(unitPrice).toFixed(2)}</p>
      <Link to={`product/${product.id}`} state={product}>
        <button>
            Edit
        </button>
      </Link>
    </li>
  );
};

/*.toFixed(2)*/
