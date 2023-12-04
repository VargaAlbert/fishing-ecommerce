import { useProductsContext } from "./context/ProductsContext";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { data } from "./data/Data";

import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import ProductsPage from "./components/ProductPage/ProductsPage";
import ProductProfilePage from "./components/ProductProfilePage/ProductProfilePage"
import Footer from "./components/Footer/Footer";
import CheckCart from "./components/CheckCart/CheckCart";
import Registration from "./components/Registration/Registration";

import "./scss/App.scss";

const App = () => {
  const { menuList } = useProductsContext();
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

            {data.map((product) => {
              return (
                <Route
                  path={`/${product.SORTIMENT}/${product.ID_PRODUC}`}
                  key={product.ID_PRODUC}
                  element={<ProductProfilePage productId={product.ID_PRODUC} />}
                />
              );
            })}

            <Route path="/check-cart" element={<CheckCart />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
