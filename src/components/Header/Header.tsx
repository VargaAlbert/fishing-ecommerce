import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShopContext } from "../../context/ShopContext";
import { FaCartShopping, FaHeart, FaUser, FaList, FaRightToBracket } from "react-icons/fa6";

import MenuList from "../MenuList/MenuList";
import CategoryOffcanvas from "../Header/CategoryOffcanvas/CategoryOffcanvas";
import ShopCardOffcanvas from "./ShopCardOffcanvas/ShopCartOffcanvas";
import logo from "../../img/logo.png";
import LoginModal from "./Login/LoginModal";

import "./Header.scss";

const Header: React.FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    token,
    handleLogout,
    userName,
    toggleDropdownLogin,
    handleShowMenu,
    handleShow,
    cartQuantity
  } = useShopContext();

  const cartItemsIconSumContentTSX = cartQuantity === 0 ? (
    <span className="sum" style={{ display: 'none' }}>{cartQuantity}</span>
  ) : (
    <span className="sum">{cartQuantity}</span>
  )

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleProfile = () => {
    if (token) {
      toggleDropdown()
    } else {
      toggleDropdownLogin()
    }
  }

  const navigate = useNavigate();
  const handleLogoutAndNav = () => {
    handleLogout();
    toggleDropdown()
    navigate('/');
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

          <span className="icon-container loginIcon">
            <FaUser className="icon" onClick={handleProfile} />
            BEJELENTKEZÉS
          </span>
          {isOpen && (
            <div className="dropdown-content">
              <div className="fixed-size-div">
                <div>Üdvözöljük:</div>
                <div>{userName}</div>
              </div>
              <div className="dropdownCategory">Rendeléseim</div>
              <div className="dropdownCategory">Adatmodositás</div>
              <div className="dropdownCategory">Vevöi kedvezmény</div>
              <div onClick={handleLogoutAndNav} className="dropdownCategory">
                <FaRightToBracket />
                <span className="exit">Kijelentkezés</span>
              </div>
            </div>
          )}

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
      <LoginModal />
      <ShopCardOffcanvas />
    </section>
  );
};
export default Header;