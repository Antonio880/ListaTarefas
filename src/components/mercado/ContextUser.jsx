import { createContext, useContext, useState } from 'react';

const UserContext = createContext();
const ProductsContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function useProductsContext() {
  return useContext(ProductsContext);
}

export function ProductsProvider({ children }){
  const [ products, setProducts ] = useState([]);

  return(
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
