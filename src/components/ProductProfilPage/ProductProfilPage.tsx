import { useState } from "react";
import { useCardContext } from "../../context/CardContext";
import { FaCartShopping, FaHeart } from "react-icons/fa6";

import "./ProductProfilPage.scss"

type ProductProfilPageProps = {
    productId: number
}

const ProductProfilPage = ({ productId }: ProductProfilPageProps) => {

    const { products, roundToNearestMultiple } = useCardContext();

    const [value, setValue] = useState(1);

    /*     const setNumberValue = (e) => {
            let v = e.target.value;
            if (v === "") {
                setValue("");
            } else {
                setValue(Math.abs(Number(v)));
            }
        }; */

    /*     const handleBlur = (e) => {
            let v = e.target.value;
            if (v === "" || Number(v) < 1) {
                setValue(1);
            } else {
                setValue(Math.abs(Number(v)));
            }
        }; */

    const valueIncrease = () => {
        setValue(value + 1);
    };

    const valueDecrease = () => {
        if (value === 1) {
            setValue(1);
        } else {
            setValue(value - 1);
        }
    };

    const product = products.find((product) => product.ID_PRODUC === productId);
    if (!product) {
        return <div><h2>Nincs ilyen termék!</h2></div>
    }

    return (
        <>
            <section className="product-page">
                <div className="product-page-container">
                    <div className="product-page-img-container">
                        <img
                            src={`${product.IMGURL_NO_WATER}`}
                            alt={`${product.ID_PRODUC}`}
                        />
                    </div>
                    <div className="product-page-text-container">
                        <h2>{product.PRODUCT}</h2>
                        <h3>{product.ROZMER}</h3>
                        <div className="price-container">
                            <p>{`${roundToNearestMultiple(product.CENA_S_DPH_EU_HUF).toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} `} Ft</p>
                        </div>
                        <div className="descript-container"></div>
                        <div className="btn-container">
                            <div className="INC-DEC-btn-container">
                                <button
                                /*            onClick={() => {
                                               valueDecrease();
                                           }} */
                                >
                                    -
                                </button>

                                <input
                                    type="number"
                                    value={value}
                                //onChange={setNumberValue}
                                //onBlur={handleBlur}
                                />

                                <button
                                /*                onClick={() => {
                                                   valueIncrease();
                                               }} */
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="by-btn"
                                value={value}
                            /*                onClick={(e) => {
                                               searchValue(e, product.ID_PRODUC, true);
                                               setValue(1);
                                           }} */
                            >
                                <FaCartShopping className="btn-by-icon" />
                                KOSÁRBA
                            </button>
                            <FaHeart className="btn-love-icon" />
                        </div>
                    </div>
                </div>
                <div className="product-description-container">
                    <div className="product-description-head">
                        <h4>Leirás</h4>
                    </div>
                    <div className="product-description-body">
                        <p>{product.DESCRIPTION}</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductProfilPage;