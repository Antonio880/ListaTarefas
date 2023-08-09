import React from 'react';
import ProductList from '../components/mercado/ProductList';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useUserContext } from '../components/mercado/ContextUser';
import UserDetails from '../components/listaTarefas/UserDetails';
import { Link } from 'react-router-dom';

export default function Vendas() {

  const [products, setProducts] = useState([]);
  const [ isClickedNewProduct, setIsClickedNewProduct ] = useState(false);
  const [ isClickedStore, setIsClickedStore ] = useState(false);
  const { user } = useUserContext();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  let id = 0;

  let productName = watch("ProductName");
  let quantify = watch("Quantify");
  let price = watch("Price");
  
  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      const valor = localStorage.getItem(chave);
    
      const objeto = JSON.parse(valor);
      const isProduct = products.some(objetoProduct => objetoProduct.id === objeto.id);
    
      if (typeof objeto === "object" && objeto !== null && !isProduct) {
        setProducts([...products, objeto])
      }
    }
  }, [isClickedNewProduct]); // Executa apenas na montagem do componente

  const estilo = {
    display: "flex",
    justifyContent: "center" 
  }
 
 const onSubmitForm = () => {
    
     id = parseInt(localStorage.getItem("id"));
     setIsClickedNewProduct(!isClickedNewProduct);
     id++;
     localStorage.setItem("id", id);
     const product = {
         id: id,
         name: productName,
         quantify: quantify,
         unitPrice: price,
     }
     const productString = JSON.stringify(product);
     const chaveUnica = `product_${product.id}`;
     localStorage.setItem(chaveUnica, productString);
     console.log(chaveUnica);
     setIsClickedStore(false);
   };

  return (
    <div className="sales-screen" >
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <Link to={'/Home'} class="nav-link" state={user}>Home</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to={'/ListaTarefas'} class="nav-link" state={user}>Lista de Tarefas</Link>
                        <Link to={'/Catalogo'} class="nav-link" state={user}>Catálogo de Fotos</Link>
                        <Link to={'/Vendas'} class="nav-link" state={user}>Mercado</Link>
                    </ul>
                    <UserDetails username={user.login} avatarUrl={user.avatar_url}/>
                </div>
            </div>
        </nav>
      {!isClickedStore && 
        <div>
          <h2 style={{display: 'flex', justifyContent: 'center'}}>Tela de Vendas</h2>    
          {user && <h4 style={{display: 'flex', justifyContent: 'center'}}>Seja Bem Vindo {user.email}</h4>}
          <button style={{position: 'absolute', top: "2%", left:"85%"}} onClick={() => setIsClickedStore(true)} className="btn btn-primary">Adicionar</button>
          <ProductList products={products} />
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