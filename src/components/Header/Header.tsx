import { Link } from "react-router-dom";
import { useProductsContext } from "../../context/ProductsContext";
import { useCardContext } from "../../context/CardContext";
import { FaCartShopping, FaHeart, FaUser, FaList } from "react-icons/fa6";

import MenuList from "../MenuList/MenuList";
import CategoryOffcanvas from "../Header/CategoryOffcanvas/CategoryOffcanvas";
import ShopCardOffcanvas from "./ShopCardOffcanvas/ShopCardOffcanvas";
import logo from "../../img/logo.png";

import "./Header.scss";

const Header: React.FC = () => {

  const { handleShowMenu } = useProductsContext();
  const { handleShow, cartQuantity } = useCardContext();

  const cartItemsIconSumContentTSX = cartQuantity === 0 ? (
    <span className="sum" style={{ display: 'none' }}>{cartQuantity}</span>
  ) : (
    <span className="sum">{cartQuantity}</span>
  )

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
            <FaUser className="icon" />
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

      <ShopCardOffcanvas />
    </section>
  );
};
export default Header;