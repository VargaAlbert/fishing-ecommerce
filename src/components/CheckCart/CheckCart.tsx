
import { useCardContext } from "../../context/CardContext";

import "./CheckCart.scss"
import CheckShopCartItems from "./CheckShopCartItems/CheckShopCartItems";



const CheckCart = () => {

    const {
        cartItems,
        cardSum,
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
                    <div>
                        <div className="text">
                            <div>Kosár részösszeg:</div><div>{cardSum()} Ft</div>
                        </div>
                        <div className="text">
                            <div>Szállítási díj:</div><div>1 290 Ft</div>
                        </div>
                        <div className="text">
                            <div>Kedvezmény:</div><div>-5.000 Ft</div>
                        </div>
                        <div className="text">
                            <div>Összesen:</div><div>15.4444 Ft</div>
                        </div>
                    </div>
                    <button className="btn">TOVÁBB A KASSZÁHOZ</button>
                    <span>Tovább vásárolok.</span>
                </div>
            </div>
        </div >
    )
}

export default CheckCart;