import React from "react";
import { useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "./ContextUser";


export default function DetailStore(){
    const location = useLocation()
    const product = location.state;
    let { name, quantify, unitPrice, id } = product;
    const { products, setProducts } = useProductsContext();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const estilo = {
        display: "flex",
        justifyContent: "center" 
    }

    const onSubmitForm = () => {
        name = watch("ProductName")
        quantify = watch("Quantify");
        unitPrice = watch("Price");
        const produtoAtualizado = {
            id: id,
            name: name,
            quantify: quantify,
            unitPrice: unitPrice,
        }
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            const valor = localStorage.getItem(chave);
            
            const objeto = JSON.parse(valor);
            
            if (objeto.id === produtoAtualizado.id) {
                const updatedList = products.filter(product => product.id !== objeto.id);
                const updatedProducts = [...updatedList, produtoAtualizado]; 
                setProducts(updatedProducts); 
                console.log(updatedProducts); 
                const updatedProductsJSON = JSON.stringify(updatedProducts);
                localStorage.setItem('products', updatedProductsJSON);
            }
        }
        navigate("/Vendas");
    }

    return(
        <div>
            <h2 style={estilo}>Detalhes do Edit do Produto</h2>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                        Nome Anterior: {name} 
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
                        Quantidade Anterior: {quantify} 
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
                        Preço Unitário Anterior : {unitPrice}
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
                        Preço Total: {watch("Price")*watch("Quantify")}
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Salvar Altetações
                </button>
            </form>
        </div>
    );
}