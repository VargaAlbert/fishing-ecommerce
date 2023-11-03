import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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

export type productInPageType = {
  readonly value: number;
  readonly label: string;
};

export const productInPage: readonly productInPageType[] = [
  { value: 12, label: '12/oldal' },
  { value: 24, label: '24/oldal' },
  { value: 48, label: '48/oldal' },
  { value: 92, label: '92/oldal' },
];

export type filterMainType = {
  readonly value: string;
  readonly label: string;
};

export const filterMain: readonly filterMainType[] = [
  { value: 'cheap', label: 'Ár szerint növekvő' },
  { value: 'expensive', label: 'Ár szerint csökkenő' },
  { value: 'A-Z', label: 'ABC szerint csökkenő' },
  { value: 'Z-A', label: 'ABC szerint növekvő' },
]

type ProductsContextProps = {
  products: ProductData[];

  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPostsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setMainSort: React.Dispatch<React.SetStateAction<string>>;

  handleCloseMenu: () => void;
  handleShowMenu: () => void;
  toggleDisplayStyle: () => void;
  pages: number[],
  menuList: string[];

  filteredProductsLength: number;
  currentPage: number;
  postsPerPage: number;

  category: string;
  displayStyle: string;
  responsiveVisible: boolean;
  showMenu: boolean;
};

const ProductsContext = createContext({} as ProductsContextProps)

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children
}) => {

  /* ----state---- */
  const [products, setProducts] = useState<ProductData[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [displayStyle, setDisplayStyle] = useState("");
  const [responsiveVisible, setResponsiveVisible] = useState(false);

  const [mainSort, setMainSort] = useState("")

  const [showMenu, setShowMenu] = useState(false);
  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  const [filteredProductsLength, setFilteredProductsLength] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const filteredDataLength = data.filter((data) => data.SORTIMENT === category).length;
    setFilteredProductsLength(filteredDataLength);
  }, [category, data]);

  useEffect(() => {
    const calculatedPages = Math.ceil(filteredProductsLength / postsPerPage);
    setPages(Array.from({ length: calculatedPages }, (_, index) => index + 1));
  }, [filteredProductsLength, postsPerPage]);




  /* ----privat var----- */
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  /* --------- */



  console.log(pages);

  useEffect(() => {
    const filteredAndSortedProducts = [...data]
      .filter((item) => item.SORTIMENT === category)
      .sort((a, b) => {
        switch (mainSort) {
          case "cheap":
            return a.CENA_S_DPH_EU_HUF - b.CENA_S_DPH_EU_HUF;
          case "expensive":
            return b.CENA_S_DPH_EU_HUF - a.CENA_S_DPH_EU_HUF;
          case "A-Z":
            if (a.PRODUCT < b.PRODUCT) {
              return -1;
            }
            if (a.PRODUCT > b.PRODUCT) {
              return 1;
            }
            return 0;
          case "Z-A":
            if (a.PRODUCT < b.PRODUCT) {
              return 1;
            }
            if (a.PRODUCT > b.PRODUCT) {
              return -1;
            }
            return 0;
          default:
            return 0;
        }
      });/*  */

    setFilteredProductsLength(filteredAndSortedProducts.length)

    setProducts(filteredAndSortedProducts.slice(firstPostIndex, lastPostIndex));


    setPages(Array.from(
      { length: Math.ceil(filteredProductsLength / postsPerPage) },
      (_, index) => index + 1
    ))
    console.log(pages);
    console.log(filteredAndSortedProducts);

  }, [data, category, mainSort, firstPostIndex, lastPostIndex]);



  //Lapozo oldall beálitása


  const currentLenght = data.filter(
    (data) => data.SORTIMENT === category
  ).length;


  /* ----function----- */
  //menu kategoriák beálitása
  const menuList = Array.from(new Set(data.map((item) => item.SORTIMENT))).sort();


  /* ---Filter--menü--- */
  const toggleDisplayStyle = () => {
    setDisplayStyle((prevStyle) => (prevStyle === "" ? "_visible" : ""));
    console.log(displayStyle);
  };
  /* ----Product-Head----- */



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
    setPostsPerPage,
    category,
    setCategory,
    menuList,

    displayStyle,
    responsiveVisible,

    toggleDisplayStyle,

    filteredProductsLength,
    pages,

    showMenu,
    handleCloseMenu,
    handleShowMenu,
    setMainSort

  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;