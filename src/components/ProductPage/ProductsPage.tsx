import React from 'react'
import { Link } from "react-router-dom";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { useCardContext } from "../../context/CardContext";
import { useProductsContext } from '../../context/ProductsContext';

import "./ProductsPage.scss"
import Pagination from './Pagination/Pagination';

const ProductsPage = () => {

    const { roundToNearestMultiple } = useCardContext();
    const { currentPosts, category } = useProductsContext();

    return (
        <div>
            {/* FilterBar */}
            <div className="pagination-container">
                <div className="product-item-container">
                    {currentPosts.map((product) => {
                        return (
                            <div className="product-container" key={product.ID_PRODUC + product.EAN}>
                                <Link className='product-link' to={`/${category}/${product.ID_PRODUC}`}>
                                    <img
                                        src={`${product.IMGURL_NO_WATER}`}
                                        alt={`${product.ID_PRODUC}`}
                                    />
                                    <h3>{product.PRODUCT}</h3>
                                    <h4>{product.ROZMER}</h4>
                                </Link>

                                <div>
                                    <p className="product-id">cikszám: {product.ID_PRODUC}</p>
                                </div>
                                <div>
                                    <p className="price">
                                        {`${roundToNearestMultiple(product.CENA_S_DPH_EU_HUF)
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} `}
                                        Ft
                                    </p>
                                </div>
                                <div className="product-item-by-container">
                                    <FaHeart className="btn-by-icon" />
                                    <button
                                        className="by-btn"
                                    /*   value={1}
                                     onClick={(e) => {
                                         searchValue(e, data.ID_PRODUC, true);
                                     }} */
                                    >
                                        <FaCartShopping className="btn-by-icon" />
                                        KOSÁRBA
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Pagination />
            </div>
        </div>
    )
}
export default ProductsPage;