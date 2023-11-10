import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import carousel00 from "../../../img/carousel00.png";
import carousel01 from "../../../img/carousel01.png";
import carousel02 from "../../../img/carousel02.png";

import "./HomeCarousel.scss"
import { Link } from 'react-router-dom';

const HomeCarousel: React.FC = () => {
    return (
        <div className="carousel-container">
            <Carousel fade>
                <Carousel.Item>
                    <div className="car-item-cont">
                        <img className="car-img-cont" src={carousel00} alt="carousel00" />
                        <div className="car-item-text">
                            <p>Akciós kinálat</p>
                            <h2>DELPHIN NYELETŐFÉKES ORSÓK </h2>
                            <h4>
                                Válogs több 100 akciós Delphin nyeletőfékes orsóink közül.
                            </h4>
                            <Link to="/Orsók/101001219">
                                <button className="home-car-btn">MEGNÉZEM</button>
                            </Link>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="car-item-cont">
                        <img className="car-img-cont" src={carousel01} alt="carousel00" />
                        <div className="car-item-text">
                            <p>Újonnan a kínálatba</p>
                            <h2>CARP ZOOM Satellite 301 3+1</h2>
                            <h4>
                                Megérkezett az új CARP ZOOM Satellite 301 3+1 kapásjelző szett,
                                mely akár bővíthető 4+1-ig.
                            </h4>
                            <Link to="/Kiegészítők/101001363">
                                <button className="home-car-btn">MEGNÉZEM</button>
                            </Link>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="car-item-cont">
                        <img className="car-img-cont" src={carousel02} alt="carousel00" />
                        <div className="car-item-text">
                            <p>Akciós kinálat</p>
                            <h2>DELPHIN THORN HOOK</h2>
                            <h4>
                                Akciós az egyik legjobb pontyozó horog. Több méretben
                                rendelhető.
                            </h4>
                            <Link to="/kiegészítők/101001456">
                                <button className="home-car-btn">MEGNÉZEM</button>
                            </Link>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
export default HomeCarousel;