import React, { ChangeEvent } from "react";
import { useCardContext } from "../../../../context/CardContext";
import { FaTrash } from "react-icons/fa6";
import "./ShopCartItems.scss";

type ShopCartItemsProps = {
    id: number
    quantity: string
}

const ShopCartItems: React.FC<ShopCartItemsProps> = ({ id, quantity }) => {

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
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setNumberValue(e, id)}
                        value={setValue(id)}
                        onBlur={(e) => handleBlur(e, id)}
                    />
                    <button onClick={() => increaseCartQuantity(item.ID_PRODUC)}>
                        +
                    </button>
                </div>
                <p className="price">
                    {`${formatPrice((Number(quantity) * roundToNearestMultiple(item.CENA_S_DPH_EU_HUF)))} `}
                    Ft
                </p>
            </div>
        </section>
    );
}

export default ShopCartItems;