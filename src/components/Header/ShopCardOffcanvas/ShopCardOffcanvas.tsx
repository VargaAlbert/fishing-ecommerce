import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaCartShopping } from "react-icons/fa6";
import { useCardContext } from "../../../context/CardContext";
import ShopCardItems from "../ShopCardOffcanvas/ShopCardItems/ShopCardItems";
import "./ShopCardOffcanvas.scss"

const ShopCardOffcanvas = () => {

    const { products, cartItems, show, handleClose, handleShow } = useCardContext();

    return (
        <div className="card-offcanvas-container">
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <div className="offcanvas_icon_container">
                        <FaCartShopping className="icon" />
                        <Offcanvas.Title>KOSARAM</Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className="position-relative p-0">
                    {cartItems.length === 0 ? (
                        <div className="car_zero">
                            Még nincsenek termékek a kosaradban!
                        </div>
                    ) : (
                        cartItems
                            .map((item) => <ShopCardItems key={item.id} {...item} />).reverse()
                    )}
                    <div className="car_sum_cont">
                        <div>
                            <p className="car_sum_text">ÖSSZESEN:</p>
                            <p className="car_sum_price">
                                {`${cartItems
                                    .reduce((total, cartItem) => {
                                        const item = products.find(
                                            (i) => i.ID_PRODUC === cartItem.id
                                        );
                                        return (
                                            total +
                                            (item?.CENA_S_DPH_EU_HUF || 0) *
                                            cartItem.quantity
                                        );
                                    }, 0)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} `}
                                Ft
                            </p>
                        </div>
                        <button>TOVÁBB A PÉNZTÁRHOZ</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default ShopCardOffcanvas;