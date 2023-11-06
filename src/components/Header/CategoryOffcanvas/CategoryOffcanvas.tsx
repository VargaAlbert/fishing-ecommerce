import { useProductsContext } from "../../../context/ProductsContext";
import { FaList } from "react-icons/fa6";

import Offcanvas from 'react-bootstrap/Offcanvas';
import MenuList from "../../MenuList/MenuList";

const CategoryOffcanvas: React.FC = () => {

    const { showMenu, handleCloseMenu } = useProductsContext();
    return (
        <div className="menu-canvas-container">
            <Offcanvas show={showMenu} onHide={handleCloseMenu} className="d-xl-none">
                <Offcanvas.Header closeButton>
                    <div className="offcanvas-icon-container">
                        <FaList className="icon" />
                        <Offcanvas.Title>KATEGORIÁK</Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="vertical-menu-container">
                        <MenuList />
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default CategoryOffcanvas;