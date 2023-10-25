import React from 'react';
import ProductList from '../components/Mercado/ProductList';
import NewProductDetails from '../components/Mercado/NewProduct';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../components/ContextUser';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';

export default function Vendas() {

  const [ isClickedStore, setIsClickedStore ] = useState(false);
  const [ products, setProducts ] = useState([]);
  const [ userGitHub, setUserGitHub ] = useState();
  const { user } = useUserContext();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  let productName = watch("ProductName");
  let quantify = Number(watch("Quantify"));
  let price = Number(watch("Price"));

  const handleRemoveProduct = async (productToRemove) => {
    const updatedList = products.filter(product => product._id !== productToRemove._id);
    await axios.delete(`http://localhost:3001/products/${productToRemove._id}`);
    setProducts(updatedList);
  };

  const fetchUser = async () => {
    try{
      const response = await axios.get(`http://localhost:3001/users/busca?githubId=${user.id}`)
      setUserGitHub(response.data[0]);
      //console.log(userGitHub);
    }catch (error) {
      console.error("Erro ao buscar as tarefas: ", error);
    }
    //setUserGitHub(user);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar os produtos: ", error);
    }
  };

  useEffect( () => {
    fetchUser().then(() => fetchData());
  }, [])
  
  const onSubmitForm = async () => {
    try {
      const product = {
        name: productName,
        quantify: quantify,
        unitPrice: price,
        user: userGitHub._id,
      };
      const response = await axios.post("http://localhost:3001/products", product);
      if (response.status === 200) {
        const updatedProductList = [...products, response.data[0]];
        setProducts(updatedProductList);
      } else {
        // Trate o caso em que a resposta não é bem-sucedida
      }
      const searchId = await axios.get(
        `http://localhost:3001/products/busca?name=${product.name}`
      );
      product._id = searchId.data[0]._id;
      setProducts([...products, product]);
    } catch (error) {
      console.error("Erro ao cadastrar o produto: ", error);
    }
    setIsClickedStore(false);
  };

  return (
    <div className="App" >
      <Header />
      {!isClickedStore && 
        <div>
          <h2 style={{display: 'flex', justifyContent: 'center'}}>Tela de Vendas</h2>    
          <div className="fab" >
            <div id='teste'>
              <button className="main" onClick={() => setIsClickedStore(true)} />
            </div>
          </div>
          <ProductList products={products} onRemove={handleRemoveProduct} setProducts={setProducts} />
        </div>
      }
      {isClickedStore && <NewProductDetails onSubmitForm={handleSubmit(onSubmitForm)} errors={errors} register={register} price={price} quantify={quantify} />}
    </div>
  );
};