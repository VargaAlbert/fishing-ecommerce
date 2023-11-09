import React, { ChangeEvent } from "react";
import { useCardContext } from "../../../context/CardContext";
import { FaTrash } from "react-icons/fa6";
import "./CheckShopCartItems.scss";

type CheckShopCartItemsProps = {
    id: number
    quantity: string
}

const CheckShopCartItems: React.FC<CheckShopCartItemsProps> = ({ id, quantity }) => {

    const {
        products,
        cartItems,
        increaseCartQuantity,
        decreaseCartQuantity,
        searchValue,
        removeFromCart,
        roundToNearestMultiple,
        formatPrice,
        handleKeyPress
    } = useCardContext();

    const item = products.find((item) => item.ID_PRODUC === id);

    if (item == null) {
        return null;
    }

    const setNumberValue = (e: ChangeEvent<HTMLInputElement>) => {

        e.target.value === "" ?
            (searchValue(" ", id, false))
            : (searchValue(String(Math.floor(Math.abs(Number(e.target.value)))), id, false));
    }

    const setValue = () => {
        if (cartItems) {
            const foundItem = cartItems.find((item) => item.id === id);
            if (foundItem) {
                return foundItem.quantity
            }
        }
        return 0;
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) < 1) {
            searchValue("1", id, false);
        } else {
            searchValue(String(Math.abs(Number(e.target.value))), id, false);
        }
    }

    return (
        <section className="CheckShopCartItems-main-container">

            <div className="check-img-container">
                <img src={`${item.IMGURL_NO_WATER}`} alt={`${item.ID_PRODUC}`} />
            </div>


            <div className="check-description-container">

                <h3>{item.PRODUCT} {item.ROZMER}</h3>
                {/* <h4>{item.ROZMER}</h4> */}


                <div className="check-delete-icon-con">
                    <FaTrash
                        className="check-icon"
                        onClick={() => removeFromCart(item.ID_PRODUC)}
                    />
                </div>
            </div>

            <div className="check-price-container">
                <div className="check-price-btn-cont">
                    <div className="price">
                        {`${formatPrice(roundToNearestMultiple(item.CENA_S_DPH_EU_HUF))} `} Ft/db
                    </div>
                    <div className="check-INC-DEC-btn-container">
                        <button onClick={() => decreaseCartQuantity(item.ID_PRODUC)}>
                            -
                        </button>
                        <input
                            type="number"
                            onKeyDown={handleKeyPress}
                            onChange={setNumberValue}
                            value={setValue()}
                            onBlur={handleBlur}
                        />
                        <button onClick={() => increaseCartQuantity(item.ID_PRODUC)}>
                            +
                        </button>
                    </div>
                </div>
                <p className="check-price">
                    {`${formatPrice((Number(quantity) * roundToNearestMultiple(item.CENA_S_DPH_EU_HUF)))} `}
                    Ft
                </p>
            </div>
        </section>
    );
}

export default CheckShopCartItems;