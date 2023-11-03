import React, { ChangeEvent } from "react";
import { useCardContext } from "../../../../context/CardContext";
import { FaTrash } from "react-icons/fa6";
import "./ShopCardItems.scss";

type ShopCardItemsProps = {
    id: number
    quantity: string
}

const ShopCardItems = ({ id, quantity }: ShopCardItemsProps) => {

    const {
        products,
        cartItems,
        increaseCartQuantity,
        decreaseCartQuantity,
        searchValue,
        removeFromCart,
        roundToNearestMultiple,
    } = useCardContext();

    const item = products.find((item) => item.ID_PRODUC === id);
    if (item == null) {
        return null;
    }

    const setNumberValue = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value === "" ? (searchValue(" ", id, false)) : (searchValue(String(Math.abs(Number(e.target.value))), id, false));
        console.log(e.target.value)
    }

    const setValue = () => {
        if (cartItems) {
            const foundItem = cartItems.find((item) => item.id === id);
            if (foundItem) {
                return foundItem.quantity;
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
                        onChange={setNumberValue}
                        value={setValue()}
                        onBlur={handleBlur}
                    />
                    <button onClick={() => increaseCartQuantity(item.ID_PRODUC)}>
                        +
                    </button>
                </div>
                <p className="price">
                    {`${(Number(quantity) * roundToNearestMultiple(item.CENA_S_DPH_EU_HUF))
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} `}
                    Ft
                </p>
            </div>
        </section>
    );
}

export default ShopCardItems;