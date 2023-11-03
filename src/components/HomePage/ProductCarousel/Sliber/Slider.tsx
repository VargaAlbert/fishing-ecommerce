import { Link } from "react-router-dom";
import { useCardContext } from '../../../../context/CardContext'
import { ProductDataType } from "../../../../data/Data"
import { FaCartShopping, FaHeart } from "react-icons/fa6";

import "./Slider.scss"

type SliderProps = {
    product: ProductDataType;
}

const Slider: React.FC<SliderProps> = ({ product }: SliderProps) => {

    const { searchValue, roundToNearestMultiple } = useCardContext();

    return (
        <div className="slide-main-container">
            <div className="slider-product-container" key={product.ID_PRODUC + product.EAN}>
                <Link className="slider-link"
                    to={`/${product.SORTIMENT}/${product.ID_PRODUC}`}>
                    <img
                        src={`${product.IMGURL_NO_WATER}`}
                        alt={`${product.ID_PRODUC}`}
                    />
                    <h3>{product.PRODUCT}</h3>
                    <h4>{product.ROZMER}</h4>
                </Link>

                <div>
                    <p className="slider-product-id">cikszám: {product.ID_PRODUC}</p>
                </div>
                <div>
                    <p className="slider-price">
                        {`${roundToNearestMultiple(product.CENA_S_DPH_EU_HUF)}`} Ft
                    </p>
                </div>
                <div className="slider-product-item-by-container">
                    <FaHeart className="slider-btn-heart-icon" />
                    <button className="slider-by-btn"
                        onClick={() => { searchValue("1", product.ID_PRODUC, true) }}>

                        <FaCartShopping className="slider-btn-by-icon" />
                        KOSÁRBA
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Slider;