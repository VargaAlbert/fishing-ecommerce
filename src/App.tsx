import { useProductsContext } from "./context/ProductsContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import ProductsPage from "./components/ProductPage/ProductsPage";
import ProductProfilPage from "./components/ProductProfilPage/ProductProfilPage"
import Footer from "./components/Footer/Footer";

import "./scss/App.scss";

const App = () => {
  const { products, category, menuList } = useProductsContext();
  return (
    <Router>
      <div className="main-background">
        <Header />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {menuList.map((category) => {
              return (
                <Route
                  path={`/${category}`}
                  key={category}
                  element={<ProductsPage />}
                />
              );
            })}

            {products.map((product) => {
              console.log(`/${product.SORTIMENT}/${product.ID_PRODUC}`);
              console.log(product.ID_PRODUC)
              return (
                <Route
                  path={`/${product.SORTIMENT}/${product.ID_PRODUC}`}
                  key={product.ID_PRODUC}
                  element={<ProductProfilPage productId={product.ID_PRODUC} />}
                />
              );
            })}

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
