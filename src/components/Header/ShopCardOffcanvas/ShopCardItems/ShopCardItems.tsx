import React from "react";
import { useCardContext } from "../../../../context/CardContext";
import { FaTrash } from "react-icons/fa6";
import "./ShopCardItems.scss";

type ShopCardItemsProps = {
    id: number
    quantity: number
}

const ShopCardItems = ({ id, quantity }: ShopCardItemsProps) => {

    const {
        products,
        cartItems,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        roundToNearestMultiple,
        //searchValue,
        //handleBlur,
    } = useCardContext();

    const item = products.find((item) => item.ID_PRODUC === id);
    if (item == null) {
        return null;
    }

    return (
        <section className="ShopCardItems-main-container">
            <div className="content-container">
                <div className="img-container">
                    <img src={`${item.IMGURL_NO_WATER}`} alt={`${item.ID_PRODUC}`} />
                </div>

                <div>
                    <h3>{item.PRODUCT}</h3>
                    <h4>{item.ROZMER}</h4>
                </div>

                <div className="delete-icon-con">
                    <FaTrash
                        className="icon"
                        onClick={() => removeFromCart(item.ID_PRODUC)}
                    />
                </div>
            </div>

            <div className="price-container">
                <div className="INC-DEC-btn-container">
                    <button onClick={() => decreaseCartQuantity(item.ID_PRODUC)}>
                        -
                    </button>
                    <input
                        type="number"
                    /*  onChange={(e) => searchValue(e, item.ID_PRODUC)}
                     value={cartItems.find((item) => item.id === id).quantity}
                     onBlur={(e) => handleBlur(e, item.ID_PRODUC)} */
                    />
                    <button onClick={() => increaseCartQuantity(item.ID_PRODUC)}>
                        +
                    </button>
                </div>
                <p className="price">
                    {`${(quantity * roundToNearestMultiple(item.CENA_S_DPH_EU_HUF))
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} `}
                    Ft
                </p>
            </div>
        </section>
    );
}

export default ShopCardItems;