import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { data } from "../data/Data";

export type ProductData = {
  ID_PRODUC: number;
  EAN: number;
  PRODUCT: string;
  SKUPINA: number;
  ROZMER: string;
  IMGURL_NO_WATER: string;
  DESCRIPTION: string;
  CENA_S_DPH_EU_HUF: number;
  SORTIMENT: string;
};

type ProductsProviderProps = {
  children: ReactNode;
};

type ProductsContextProps = {
  products: ProductData[];
  currentPosts: ProductData[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  handleCloseMenu: () => void;
  handleShowMenu: () => void;
  toggleDisplayStyle: () => void;

  pages: number[],
  menuList: string[];

  currentPage: number;
  postsPerPage: number;
  currentLenght: number;
  category: string;
  displayStyle: string;
  responsiveVisible: boolean;
  showMenu: boolean;
};

const ProductsContext = createContext({} as ProductsContextProps)

/* const ProductsContext = createContext<ProductsContextProps>({
  setCurrentPage: () => 0,
  setCategory: () => "",
  toggleDisplayStyle: () => { },
 
  products: [],
  currentPosts: [],
  menuList: [],
  pages: [],
  
  currentPage: 0,
  postsPerPage: 0,
  currentLenght: 0,
  category: "",
  displayStyle: "",
  responsiveVisible: false,
}); */

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children
}) => {
  /* ----state---- */
  const [products] = useState<ProductData[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [category, setCategory] = useState("");
  const [displayStyle, setDisplayStyle] = useState("");
  const [responsiveVisible, setResponsiveVisible] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  /* ----privat var----- */
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  /* --------- */

  /* ----function----- */
  //menu kategoriák beálitása
  const menuList = Array.from(new Set(products.map((item) => item.SORTIMENT)));

  //Lapozo oldall beálitása
  const currentPosts = data
    .filter((data) => data.SORTIMENT === category)
    .slice(firstPostIndex, lastPostIndex);

  const currentLenght = data.filter(
    (data) => data.SORTIMENT === category
  ).length;

  const pages = Array.from(
    { length: Math.ceil(currentLenght / postsPerPage) },
    (_, index) => index + 1
  );

  /* ---Filter--menü--- */
  const toggleDisplayStyle = () => {
    setDisplayStyle((prevStyle) => (prevStyle === "" ? "_visible" : ""));
    console.log(displayStyle);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setResponsiveVisible(false);
        setDisplayStyle("_visible");
      } else {
        setResponsiveVisible(true);
        setDisplayStyle("");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const contextValue: ProductsContextProps = {
    products,
    currentPage,
    setCurrentPage,
    postsPerPage,
    category,
    setCategory,
    menuList,

    displayStyle,
    responsiveVisible,

    toggleDisplayStyle,
    currentPosts,
    currentLenght,
    pages,

    showMenu,
    handleCloseMenu,
    handleShowMenu
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;