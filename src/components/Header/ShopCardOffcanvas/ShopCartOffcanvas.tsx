import { FaCartShopping } from "react-icons/fa6";
import { useCardContext } from "../../../context/CardContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";

import Offcanvas from 'react-bootstrap/Offcanvas';
import ShopCartItems from "./ShopCartItems/ShopCartItems";

import "./ShopCartOffcanvas.scss"

const ShopCartOffcanvas: React.FC = () => {

    const {
        cartItems,
        show,
        handleClose,
        cardSum,
    } = useCardContext();



    const cartItemsContentTSX =
        cartItems.length === 0 ? (
            <div className="car-zero">Még nincsenek termékek a kosaradban!</div>
        ) : (
            cartItems.map((item) => <ShopCartItems key={item.id} {...item} />).reverse()
        );

    return (
        <div className="card-offcanvas-container">
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <div className="offcanvas-icon-container">
                        <FaCartShopping className="icon" />
                        <Offcanvas.Title>KOSARAM</Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className="position-relative p-0">
                    {cartItemsContentTSX}
                    <div className="car-sum-cont">
                        <div>
                            <p className="car-sum-text">ÖSSZESEN:</p>
                            <p className="car-sum-price">
                                {cardSum(false)} Ft
                            </p>
                        </div>
                        <Link className="cart-link" to="/check-cart">
                            <button>TOVÁBB A PÉNZTÁRHOZ</button>
                        </Link>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default ShopCartOffcanvas;