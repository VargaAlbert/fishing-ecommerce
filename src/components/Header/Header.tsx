import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductsContext } from "../../context/ProductsContext";
import { useCardContext } from "../../context/CardContext";
import { useAuthContext } from "../../context/AuthContext";
import { FaCartShopping, FaHeart, FaUser, FaList } from "react-icons/fa6";

import MenuList from "../MenuList/MenuList";
import CategoryOffcanvas from "../Header/CategoryOffcanvas/CategoryOffcanvas";
import ShopCardOffcanvas from "./ShopCardOffcanvas/ShopCartOffcanvas";
import logo from "../../img/logo.png";
import LoginModal from "./Login/LoginModal";

import "./Header.scss";

const Header: React.FC = () => {

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const { token } = useAuthContext();
  const { handleShowMenu } = useProductsContext();
  const { handleShow, cartQuantity } = useCardContext();

  const toggle = () => setShowLogin(!showLogin)


  const cartItemsIconSumContentTSX = cartQuantity === 0 ? (
    <span className="sum" style={{ display: 'none' }}>{cartQuantity}</span>
  ) : (
    <span className="sum">{cartQuantity}</span>
  )

  const handleProfile = () => {
    if (token) {

    } else {
      toggle
    }
  }

  return (
    <section className="nav-background">
      <CategoryOffcanvas />
      <nav className="nav-container">

        <div className="nav-menu-btn-container">
          <span className="icon-container">
            <FaList className="icon" onClick={handleShowMenu} />
            MENÜ
          </span>
        </div>

        <div className="logo-container">
          <Link className="logo-link" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="nav-menu-container">
          <MenuList />
        </div>

        <div className="nav-icon-container">

          <span className="icon-container">
            <FaUser className="icon" onClick={handleProfile} />
            BEJELENTKEZÉS
          </span>

          <span className="icon-container">
            <FaHeart className="icon" />
            KEDVENCEIM
          </span>
          <span className="icon-container">
            <FaCartShopping className="icon" onClick={handleShow} />
            {cartItemsIconSumContentTSX}
            KOSÁR
          </span>
        </div>

      </nav>
      <LoginModal toggle={toggle} show={showLogin} />
      <ShopCardOffcanvas />
    </section>
  );
};
export default Header;