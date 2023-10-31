import React from 'react'
import "./HomePage.scss"
import ProductCarousel from './ProductCarousel/ProductCarousel';
import HomeCarousel from './HomeCarousel/HomeCarousel';

const HomePage = () => {
    return (
        <div className="HomePage-main-container">
            <HomeCarousel />
            <ProductCarousel />
            <ProductCarousel />
        </div>
    )
}
export default HomePage;