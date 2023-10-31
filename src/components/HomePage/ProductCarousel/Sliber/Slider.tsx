import { Link } from "react-router-dom";
import { ProductData, useCardContext } from '../../../../context/CardContext'
import { FaCartShopping, FaHeart } from "react-icons/fa6";

import "./Slider.scss"

type SliderProps = {
    product: ProductData;
}

const Slider = ({ product }: SliderProps) => {

    const { roundToNearestMultiple } = useCardContext();

    return (
        <div className="slide">
            <div className="product_container" key={product.ID_PRODUC + product.EAN}>
                <Link to={`/${product.SORTIMENT}/${product.ID_PRODUC}`}>
                    <img
                        src={`${product.IMGURL_NO_WATER}`}
                        alt={`${product.ID_PRODUC}`}
                    />
                    <h3>{product.PRODUCT}</h3>
                    <h4>{product.ROZMER}</h4>
                </Link>

                <div>
                    <p className="product_id">cikszám: {product.ID_PRODUC}</p>
                </div>
                <div>
                    <p className="price">
                        {`${roundToNearestMultiple(product.CENA_S_DPH_EU_HUF)}`} Ft
                    </p>
                </div>
                <div className="product_item_by_container">
                    <FaHeart className="btn_by_icon" />
                    <button className="by_btn" value={1}>
                        <FaCartShopping className="btn_by_icon" />
                        KOSÁRBA
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Slider;