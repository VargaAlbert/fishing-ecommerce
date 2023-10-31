import { ProductData, useProductsContext } from "../../../context/ProductsContext";

import Slider from "./Sliber/Slider";

import "./ProductCarousel.scss"

const ProductCarousel = () => {

    const { products } = useProductsContext();

    const saleProduct: ProductData[] = products.slice(15, 25);
    const newProduct: ProductData[] = products.slice(30, 40);

    return (
        <div className="slider-main-container">
            <div className="slider-product-label">
                <h3>Akciós termékein</h3>
                <h4>Válogass az akciós kínálatunkból.</h4>
            </div>
            <div className="slider">
                <div className="slide-track">
                    {saleProduct.map((saleProduct) => {
                        console.log(saleProduct);
                        return <Slider key={saleProduct.ID_PRODUC} product={saleProduct} />;
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