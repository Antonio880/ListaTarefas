import React from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { useState } from 'react';

export default function ProductList({ products, onRemove, setProducts}) {
  const [editingTask, setEditingTask] = useState(null);
  
  const startEditingTask = (taskId) => {
    setEditingTask(taskId);
  };

  const saveEditedTask = async (taskId, editedText) => {
    await axios.put(`http://localhost:3001/tarefas/${taskId}`,{
    "task": editedText
  })
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
    setProducts((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, task: editedText } : task
      )
    );
    setEditingTask(null);
};
  return (
    <div>
      {
        products ? 
          (<ul style={{display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', listStyle: 'none', paddingLeft: "0"}} className='overflow-auto'>
          {
            products.map((product, index) => (
              <ProductCard 
                key={index} 
                product={product} 
                onRemove={onRemove} 
                products={products} 
                onEdit={startEditingTask}
                onSaveEdit={saveEditedTask}
                isEditing={editingTask === product._id} />
            ))
          }
          </ul>) : 
          <h1>Nenhum Produto ainda</h1>
      }
    </div>
  );
};