import { useCardContext } from "../../../context/CardContext";
import { ProductDataType } from "../../../data/dataType"

import Slider from "./Slider/Slider";

import "./ProductCarousel.scss"

const ProductCarousel: React.FC = () => {

    const { products } = useCardContext();

    const saleProduct: ProductDataType[] = products.slice(15, 25);
    const newProduct: ProductDataType[] = products.slice(50, 60);

    return (
        <div className="slider-main-container">

            <div className="slider-product-label">
                <h3>Akciós termékeink</h3>
                <h4>Válogass az akciós kínálatunkból.</h4>
            </div>

            <div className="slider">
                <div className="slide-track">
                    {saleProduct.map((newProduct) => {
                        return <Slider key={newProduct.ID_PRODUC} product={newProduct} />;
                    })}
                    {saleProduct.map((newProduct) => {
                        return <Slider key={newProduct.ID_PRODUC} product={newProduct} />;
                    })}
                </div>
            </div>

            <div className="slider-product-label">
                <h3>Újonnan a kínálatban.</h3>
                <h4>Válogass az újdonságaink közül.</h4>
            </div>

            <div className="slider">
                <div className="slide-track">
                    {newProduct.map((newProduct) => {
                        return <Slider key={newProduct.ID_PRODUC} product={newProduct} />;
                    })}
                    {newProduct.map((newProduct) => {
                        return <Slider key={newProduct.ID_PRODUC} product={newProduct} />;
                    })}

                </div>
            </div>

        </div>
    )
}
export default ProductCarousel;