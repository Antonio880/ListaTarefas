import React from 'react';

export default function NewProductDetails({ onSubmitForm, errors, register, price, quantify }) {
  
    const estilo = {
    display: "flex",
    justifyContent: "center" 
  };

  return (
    <div>
      <h2 style={estilo}>Detalhes do novo Produto</h2>
      <form onSubmit={onSubmitForm}>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Nome do Produto
              </label>
              <div className="col-sm-10">
                  <input
                      type="text"
                      className="form-control"
                      {...register("ProductName", { required: true, minLength: 2 })}
                  />
                  {errors.productName && <span style={{color: "red", fontSize: "14px"}}>Este campo é obrigatório e deve conter pelo menos 2 caracteres.</span>}
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Quantidade
              </label>
              <div className="col-sm-10">
                  <input
                      type="number"
                      className="form-control"
                      {...register("Quantify")}
                  />
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Preço Unitário
              </label>
              <div className="col-sm-10">
                  <input
                      type="number"
                      className="form-control"
                      {...register("Price")}
                  />
              </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Preço Total: {price*quantify}
              </label>
          </div>
          <button type="submit" className="btn btn-primary">
              Cadastrar
          </button>
      </form>
    </div>
  );
}