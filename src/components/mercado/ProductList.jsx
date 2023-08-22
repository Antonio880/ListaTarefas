import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, onRemove, setOnUpdate, onUpdate }) {
  return (
    <div>
      {products.length > 0 && 
        <ul style={{display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', listStyle: 'none'}} >
        {
          products.map((product, index) => (
            <ProductCard key={index} product={product} onRemove={onRemove} products={products} setOnUpdate={setOnUpdate} onUpdate={onUpdate} />
          ))
        }
        </ul>
      }
    </div>
  );
};