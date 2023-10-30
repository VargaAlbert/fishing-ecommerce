import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/index.scss';
import { ProductsProvider } from "./context/ProductsContext";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>
);

