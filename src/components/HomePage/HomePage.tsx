import React from 'react'
import "./HomePage.scss"
import ProductCarousel from './ProductCarousel/ProductCarousel';
import HomeCarousel from './HomeCarousel/HomeCarousel';

const HomePage: React.FC = () => {
    return (
        <div className="HomePage-main-container">
            <HomeCarousel />
            <ProductCarousel />
        </div>
    )
}
export default HomePage;