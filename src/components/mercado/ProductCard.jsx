import React from 'react';

export default function ProductCard({ product }){
  const { name, quantify, unitPrice } = product;

  return (
    <li className="product-card">
      <h3>{name}</h3>
      <p>Quantidade: {quantify}</p>
      <p>Valor Unitário: R${parseFloat(unitPrice).toFixed(2)}</p>
    </li>
  );
};

/*.toFixed(2)*/
