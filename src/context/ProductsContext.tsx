import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from 'axios';

import { ProductDataType, fetchData } from "../data/dataType";
import { useLocalStorage } from "../hooks/useLocalStorage"

interface ProductsProviderProps {
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

const findProductInPageIndex = (selectedValue: number): number => {
  return productInPage.findIndex((item) => item.value === selectedValue);
};

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

const findFilterMainIndex = (selectedValue: string): number => {
  return filterMain.findIndex((item) => item.value === selectedValue);
};

type ProductsContextProps = {

  products: ProductDataType[];
  productsNoFilter: ProductDataType[];

  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPostsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setMainSort: React.Dispatch<React.SetStateAction<string>>;

  handleCloseMenu: () => void;
  handleShowMenu: () => void;

  pages: number[];
  menuList: string[];

  selectedIndexFilterMain: number;
  selectedIndexProductInPage: number;
  postsPerPage: number;
  filteredProductsLength: number;
  currentPage: number;
  category: string;
  showMenu: boolean;

};

const ProductsContext = createContext({} as ProductsContextProps)

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

let data: ProductDataType[] = []
const getData = async () => {
  data = await fetchData();
};
getData();

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children
}) => {

  /* ----state---- */
  const [products, setProducts] = useState<ProductDataType[]>([]);
  const [productsNoFilter, setProductsNoFilter] = useState<ProductDataType[]>(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
        setProductsNoFilter(response.data)
      } catch (error) {
        console.error('Hiba történt:', error);
        setProducts([]);
      }
    };

    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  //menu kategoriák beálitása
  const [category, setCategory] = useLocalStorage<string>('category', "");

  //offcanvas beálitása
  const [showMenu, setShowMenu] = useState(false);
  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  //pagnatinon beálitása
  const [pages, setPages] = useState<number[]>([]);

  //product head filter
  const [postsPerPage, setPostsPerPage] = useLocalStorage<number>('pageProduct', 12);
  const [mainSort, setMainSort] = useLocalStorage<string>('mainSort', "");
  const [filteredProductsLength, setFilteredProductsLength] = useState(0);

  // Megkeressük a kiválasztott értékhez tartozó elemet a filterMain tömbben
  const selectedIndexFilterMain = findFilterMainIndex(mainSort);

  // Megkeressük a kiválasztott értékhez tartozó elemet a productInPage tömbben
  const selectedIndexProductInPage = findProductInPageIndex(postsPerPage);

  /* ----pagenation var----- */
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const menuList = Array.from(new Set(productsNoFilter.map((item) => item.SORTIMENT))).sort();

  useEffect(() => {
    const calculatedPages = Math.ceil(filteredProductsLength / postsPerPage);
    setPages(Array.from({ length: calculatedPages }, (_, index) => index + 1));
  }, [filteredProductsLength, postsPerPage]);

  useEffect(() => {
    const filteredDataLength = productsNoFilter.filter((data) => data.SORTIMENT === category).length;
    setFilteredProductsLength(filteredDataLength);

    const filteredAndSortedProducts = [...productsNoFilter]
      .filter((item) => item.SORTIMENT === category)
      .sort((a, b) => {
        switch (mainSort) {
          case "cheap":
            return a.CENA_S_DPH_EU_HUF - b.CENA_S_DPH_EU_HUF;
          case "expensive":
            return b.CENA_S_DPH_EU_HUF - a.CENA_S_DPH_EU_HUF;
          case "A-Z":
            return b.PRODUCT.localeCompare(a.PRODUCT);
          case "Z-A":
            return a.PRODUCT.localeCompare(b.PRODUCT);
          default:
            return 0;
        }
      });

    setFilteredProductsLength(filteredAndSortedProducts.length)

    //Lapozo oldall beálitása
    setProducts(filteredAndSortedProducts.slice(firstPostIndex, lastPostIndex));

    setPages(Array.from(
      { length: Math.ceil(filteredProductsLength / postsPerPage) },
      (_, index) => index + 1
    ))

  }, [category, mainSort, firstPostIndex, lastPostIndex, filteredProductsLength, postsPerPage, productsNoFilter]);

  const contextValue: ProductsContextProps = {

    products,
    currentPage,
    setCurrentPage,
    postsPerPage,
    setPostsPerPage,
    category,
    setCategory,
    menuList,
    filteredProductsLength,
    pages,
    showMenu,
    handleCloseMenu,
    handleShowMenu,
    setMainSort,
    selectedIndexProductInPage,
    selectedIndexFilterMain,
    productsNoFilter,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;