import React from "react";
import { FaFilter } from "react-icons/fa6";
import {
    useProductsContext,
    productInPageType,
    productInPage,
    filterMainType,
    filterMain
} from "../../../context/ProductsContext";

import Select from 'react-select'

import "./ProductsHead.scss"

const ProductsHead: React.FC = () => {

    const { setPostsPerPage, filteredProductsLength, setMainSort, setCurrentPage, postsPerPage } = useProductsContext();

    // const actual

    return (
        <div className="roductshead-container">
            <div className="filt-icon-cont">
                <FaFilter className="icon" />
                <span>SZŰRŐ</span>
            </div>
            <div className="db-cont">
                <span className="title">Találatokszáma:</span>
                <span className="db">{filteredProductsLength} db termék</span>
            </div>
            <div className="page-select-cont">
                <div className="label">Termékek száma:</div>
                <Select
                    options={productInPage}
                    defaultValue={productInPage[0]}
                    onChange={(option: productInPageType | null) => {
                        if (option?.value) { setPostsPerPage(option.value) }
                        setCurrentPage(1);
                    }}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary50: "#454b57",
                            primary25: '#f0003c',
                            primary: '#8f9ab3',
                        },
                    })}
                />
            </div>
            <div className="filter-cont">
                <div className="label">
                    Termékek rendezése:
                </div>

                <Select
                    placeholder="Rendezés..."
                    options={filterMain}
                    onChange={(option: filterMainType | null) => {
                        if (option?.value) { setMainSort(option.value) }
                    }}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary50: "#454b57",
                            primary25: '#f0003c',
                            primary: '#8f9ab3',
                        },
                    })}
                />

            </div>
        </div>
    );
}

export default ProductsHead;