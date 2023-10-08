import React from 'react';
import ProductList from '../components/Mercado/ProductList';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useUserContext } from '../components/ContextUser'
import { useProductsContext } from '../components/Mercado/ContextProducts';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

export default function Vendas() {

  const [ isClickedNewProduct, setIsClickedNewProduct ] = useState(false);
  const [ isClickedStore, setIsClickedStore ] = useState(false);
  const [ onUpdate, setOnUpdate ] = useState(false);
  const { user, setUser } = useUserContext();
  const { products, setProducts } = useProductsContext();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  let id = 0;
  const navigate = useNavigate();

  //Variáveis para a parte de ADD.
  let productName = watch("ProductName");
  let quantify = watch("Quantify");
  let price = watch("Price");

  const handleRemoveProduct = (productToRemove) => {
    const updatedList = products.filter(product => product.id !== productToRemove.id);
    setProducts(updatedList);
    // Além disso, você pode atualizar o localStorage se necessário
  };
  
  useEffect(() => {
    // Carregar produtos do localStorage
    const productsFromLocalStorage = localStorage.getItem('products');
    if (productsFromLocalStorage) {
      const parsedProducts = JSON.parse(productsFromLocalStorage);
      setProducts(parsedProducts);
    }
    //console.log(products);
  }, [isClickedStore, products]); // Atualiza quando 'isClickedStore' muda
 
  const onSubmitForm = () => {
    id = parseInt(localStorage.getItem("id"));
    if (isNaN(id) || id == null) {
      id = 0;
    }
    setIsClickedNewProduct(!isClickedNewProduct);
    id++;
  
    localStorage.setItem("id", id);
    const product = {
      id: id,
      name: productName,
      quantify: quantify,
      unitPrice: price,
    };
  
    // Adicionar o novo produto ao array de produtos
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
  
    // Atualizar o localStorage com o novo array de produtos
    const updatedProductsJSON = JSON.stringify(updatedProducts);
    localStorage.setItem('products', updatedProductsJSON);
  
    setIsClickedStore(false);
  };

  const estilo = {
    display: "flex",
    justifyContent: "center" 
  }

  return (
    <div className="App" >
        <Header user={user} navigate={navigate} />
      {!isClickedStore && 
        <div>
          <h2 style={{display: 'flex', justifyContent: 'center'}}>Tela de Vendas</h2>    
          {user && <h4 style={{display: 'flex', justifyContent: 'center'}}>Seja Bem Vindo {user.name}</h4>}
          <button style={{position: 'absolute', top: "2%", left:"84%"}} onClick={() => setIsClickedStore(true)} className="btn btn-primary">Adicionar</button>
          <ProductList products={products} onRemove={handleRemoveProduct} setOnUpdate={setOnUpdate} onUpdate={onUpdate} />
        </div>
      }

      {isClickedStore && <div>
            <h2 style={estilo}>Detalhes do novo Produto</h2>
            <form onSubmit={handleSubmit(onSubmitForm)}>
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
                        {errors.ProductName && <span style={{color: "red", fontSize: "14px"}}>Este campo é obrigatório e deve conter pelo menos 2 caracteres.</span>}
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
        }
    </div>
  );
};