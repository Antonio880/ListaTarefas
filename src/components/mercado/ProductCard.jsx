import React from 'react';
import { useState } from 'react';

export default function ProductCard({ product, onRemove, onEdit, onSaveEdit, isEditing }){
  const { name, quantify, unitPrice } = product;
  const [editedText, setEditedText] = useState(name);
  const handleRemoveClick = () => {
    onRemove(product); // Chama a função de remoção quando o botão for clicado
  };

  const handleEditClick = () => {
    onEdit(product._id);
  };

  const handleSaveEditClick = () => {
    onSaveEdit(product._id, editedText);
  };

  const handleCancelEditClick = () => {
    setEditedText(product.name);
    onEdit(null); // Encerra a edição
  };

  return (
    <li  >
      {isEditing ? (
        <div className="edit-task">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button className="btn btn-light" onClick={handleSaveEditClick}>
            Save
          </button>
          <button className="btn btn-outline" onClick={handleCancelEditClick}>
            Cancel
          </button>
        </div>
      ) : (
          <div className="product-card" >
            
            <h3 style={{overflowX:"auto", overflowY: 'hidden', marginRight: "12px"}}>{name}</h3>
            <p>Quantidade: {quantify}</p>
            <p>Valor Unitário: R${parseFloat(unitPrice).toFixed(2)}</p>
            <label onClick={handleRemoveClick}>🗑️</label>
            <button type="button" className="btn btn-secondary" onClick={handleEditClick}>
                Edit
            </button>
          </div>
        )
      }
    </li>
  );
};

