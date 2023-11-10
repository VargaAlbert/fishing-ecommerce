import { Link } from "react-router-dom";
import { useCardContext } from "../../context/CardContext";

import "./CheckCart.scss"
import CheckShopCartItems from "./CheckShopCartItems/CheckShopCartItems";



const CheckCart = () => {

    const {
        cartItems,
        cardSum,
        shippingFee,
        formatPrice,
    } = useCardContext();

    const cartItemsContentTSX =
        cartItems.length === 0 ? (
            <div className="check-car-zero">Még nincsenek termékek a kosaradban!</div>
        ) : (
            cartItems.map((item) => <CheckShopCartItems key={item.id} {...item} />).reverse()
        );

    return (
        <div className="check-cart-main-container">
            <div className="check-cart-container">
                <h2 className="cart-title">KOSARAM</h2>
                {cartItemsContentTSX}
            </div>
            <div className="check-sum-container" >
                <div className="check-sum">
                    <h3>Összegzés:</h3>
                    <div className="check-sum-content">
                        <div className="text">
                            <div className="format-font">Kosár részösszeg:</div><div className="format-font">{cardSum(false)} Ft</div>
                        </div>
                        <div className="text">
                            <div className="format-font">Szállítási díj:</div><div className="format-font">{formatPrice(shippingFee)} Ft</div>
                        </div>
                        <div className="text">
                            <div className="format-font">Kedvezmény:</div><div className="format-font">0 Ft</div>
                        </div>
                        <div className="text">
                            <div className="format-font">Összesen:</div><div className="format-font">{cardSum(true)} Ft</div>
                        </div>
                    </div>
                    <button>TOVÁBB A KASSZÁHOZ</button>
                    <Link className="check-sum-link" to="/" >
                        Tovább vásárolok
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default CheckCart;