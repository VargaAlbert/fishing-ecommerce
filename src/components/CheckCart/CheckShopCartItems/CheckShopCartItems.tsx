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
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        roundToNearestMultiple,
        formatPrice,
        handleKeyPress,
        handleBlur,
        setNumberValue,
        setValue,
    } = useCardContext();

    const item = products.find((item) => item.ID_PRODUC === id);

    if (item == null) {
        return null;
    }

    return (
        <section className="CheckShopCartItems-main-container">

            <div className="check-img-container">
                <img src={`${item.IMGURL_NO_WATER}`} alt={`${item.ID_PRODUC}`} />
            </div>


            <div className="check-description-container">

                <h3>{item.PRODUCT} {item.ROZMER}</h3>

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
                            onChange={(e) => setNumberValue(e, id)}
                            value={setValue(id)}
                            onBlur={(e) => handleBlur(e, id)}
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