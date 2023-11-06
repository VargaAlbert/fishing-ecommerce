import { ChangeEvent, useState } from "react";
import { useCardContext } from "../../context/CardContext";
import { FaCartShopping, FaHeart } from "react-icons/fa6";

import "./ProductProfilPage.scss"

type ProductProfilePageProps = {
    productId: number
}

const ProductProfilePage: React.FC<ProductProfilePageProps> = ({ productId }: ProductProfilePageProps) => {

    const { products, roundToNearestMultiple, searchValue, formatPrice } = useCardContext();

    const [value, setValue] = useState<string>("1");

    const setNumberValue = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value === "" ? (setValue("")) : (setValue(String(Math.floor(Math.abs(Number(e.target.value))))));
    }

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) < 1) {
            setValue("1");
        } else {
            setValue(e.target.value);
        }
    }

    const valueIncrease = () => {
        if (Number(value) < 999) {
            setValue(String(Number(value) + 1))
        }
    }

    const valueDecrease = () => {
        if (Number(value) === 1) {
            setValue("1");
        } else {
            setValue(String(Number(value) - 1));
        }
    };

    const givesValue = () => {
        if (value === typeof (String)) {
            searchValue("1", productId, true);
        } else {
            searchValue(value, productId, true);
        }
        setValue("1");
    }

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
                            className="Product-profile-img"
                            src={`${product.IMGURL_NO_WATER}`}
                            alt={`${product.ID_PRODUC}`}
                        />
                    </div>
                    <div className="product-page-text-container">
                        <h2>{product.PRODUCT}</h2>
                        <h3>{product.ROZMER}</h3>
                        <div className="price-container">
                            <p>{`${formatPrice(roundToNearestMultiple(product.CENA_S_DPH_EU_HUF))} `} Ft</p>
                        </div>
                        <div className="descript-container"></div>
                        <div className="btn-container">
                            <div className="INC-DEC-btn-container">
                                <button onClick={valueDecrease}> - </button>
                                <input
                                    type="number"
                                    value={value}
                                    onChange={setNumberValue}
                                    onBlur={handleBlur}
                                />
                                <button onClick={valueIncrease} > + </button>
                            </div>
                            <button
                                className="by-btn"
                                onClick={givesValue}
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
            </section >
        </>
    );
}

export default ProductProfilePage;