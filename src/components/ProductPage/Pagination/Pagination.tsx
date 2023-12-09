import { useShopContext } from "../../../context/ShopContext";

import "./Pagination.scss"

const Pagination: React.FC = () => {

    const { pages, currentPage, setCurrentPage } = useShopContext();

    return (
        <div className="pagenation-container">
            <div className="pagenation">
                {pages.map((page, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(page)}
                            className={page === currentPage ? "active" : ""}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Pagination;

