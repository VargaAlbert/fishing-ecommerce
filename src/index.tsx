import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductsProvider } from "./context/ProductsContext";
import { CardProvider } from "./context/CardContext";
import App from './App';
import './scss/index.scss';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ProductsProvider>
      <CardProvider>
        <App />
      </CardProvider>
    </ProductsProvider>
  </React.StrictMode>
);

