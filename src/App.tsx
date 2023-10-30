import React from "react";
import { useProductsContext } from "./context/ProductsContext";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./scss/App.scss";

const App = () => {
  const { products, currentPage } = useProductsContext();

  console.log(currentPage);
  return (
    <section>
      <Header/>
      <Main/>
      <Footer/>
    </section>
  );
}

export default App;
