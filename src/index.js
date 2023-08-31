import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider, ProductsProvider } from './components/mercado/ContextUser';
import { WeatherDataContextProvider } from './components/Tempo/ContextWeather';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ProductsProvider>
        <WeatherDataContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WeatherDataContextProvider>
      </ProductsProvider>
     </UserProvider> 
  </React.StrictMode>
);
reportWebVitals();
/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/AppRoute';
import Login from './pages/Login';
import Venda from './pages/Venda';
import { UserProvider } from './components/ContextUser';
//Criador de rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '*',
        element: <Login />,
      },
      {
        path: '/venda',
        element: <Venda />,
      },
    ]
  }
  ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
*/