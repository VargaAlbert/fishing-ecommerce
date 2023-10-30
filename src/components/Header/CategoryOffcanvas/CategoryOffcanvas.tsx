import React, { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useProductsContext } from "../../../context/ProductsContext";
import { FaList } from "react-icons/fa6";
import MenuList from "../../MenuList/MenuList";
import "./CategoryOffcanvas.scss"

const CategoryOffcanvas = () => {

    const { showMenu, handleCloseMenu } = useProductsContext();
    return (
        <div className="menu-canvas-container">
            <Offcanvas show={showMenu} onHide={handleCloseMenu} className="d-xl-none">
                <Offcanvas.Header closeButton>
                    <div className="offcanvas_icon_container">
                        <FaList className="icon" />
                        <Offcanvas.Title>KOSARAM</Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="vertical-menu-container">
                        <MenuList />
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default CategoryOffcanvas;