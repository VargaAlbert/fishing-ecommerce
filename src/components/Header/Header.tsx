import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useProductsContext } from "../../context/ProductsContext";
import { useCardContext } from "../../context/CardContext";
import ShopCardItems from "./ShopCardOffcanvas/ShopCardItems/ShopCardItems";
import logo from "../../img/logo.png";
import "./Header.scss";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaCartShopping, FaHeart, FaUser, FaList, FaX } from "react-icons/fa6";
import MenuList from "../MenuList/MenuList";
import CategoryOffcanvas from "../Header/CategoryOffcanvas/CategoryOffcanvas";
import ShopCardOffcanvas from "./ShopCardOffcanvas/ShopCardOffcanvas";

const Header = () => {

  const { products, handleShowMenu } = useProductsContext();
  const { cartItems, show, handleClose, handleShow } = useCardContext();

  return (
    <section className="nav-background">
      <CategoryOffcanvas />
      <nav className="nav_container">

        <div className="nav_menu_btn_container">
          <span className="icon_container">
            <FaList className="icon" onClick={handleShowMenu} />
            MENÜ
          </span>
        </div>

        <div className="logo_container">
          <Link className="logo-link" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="nav_menu_container">
          <MenuList />
        </div>

        <div className="nav_icon_container">
          <span className="icon_container">
            <FaUser className="icon" />
            BEJELENTKEZÉS
          </span>
          <span className="icon_container">
            <FaHeart className="icon" />
            KEDVENCEIM
          </span>
          <span className="icon_container">
            <FaCartShopping className="icon" onClick={handleShow} />
            KOSÁR
          </span>
        </div>

      </nav>

      <ShopCardOffcanvas />
    </section>
  );
};
export default Header;