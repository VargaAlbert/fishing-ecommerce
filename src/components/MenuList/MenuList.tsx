import { Link } from "react-router-dom";
import { useProductsContext } from "../../context/ProductsContext";

import "./MenuList.scss"

const MenuList = () => {
    const { setCurrentPage, setCategory, menuList } = useProductsContext();
    return (
        <>
            {menuList.map((category) => {
                return (
                    <Link
                        className="link"
                        key={category}
                        to={`/${category}`}
                        onClick={() => {
                            setCategory(`${category}`);
                            setCurrentPage(1);
                        }}
                    >
                        <span>{category}</span>
                    </Link>
                );
            })}
        </>
    );
}

export default MenuList;