import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { data, ProductDataType } from "../data/Data";
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

  products: ProductDataType[];

  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPostsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setMainSort: React.Dispatch<React.SetStateAction<string>>;

  handleCloseMenu: () => void;
  handleShowMenu: () => void;

  pages: number[],
  menuList: string[];

  filteredProductsLength: number;
  currentPage: number;
  category: string;
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
  const [products, setProducts] = useState<ProductDataType[]>(data);
  const [currentPage, setCurrentPage] = useState(1);

  const [mainSort, setMainSort] = useState("")

  //menu kategoriák beálitása
  const [category, setCategory] = useLocalStorage<string>('category', '');

  const [showMenu, setShowMenu] = useState(false);
  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  const [filteredProductsLength, setFilteredProductsLength] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [pages, setPages] = useState<number[]>([]);

  /* ----pagenation var----- */
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const menuList = Array.from(new Set(data.map((item) => item.SORTIMENT))).sort();

  useEffect(() => {
    const calculatedPages = Math.ceil(filteredProductsLength / postsPerPage);
    setPages(Array.from({ length: calculatedPages }, (_, index) => index + 1));
  }, [filteredProductsLength, postsPerPage]);

  useEffect(() => {
    const filteredDataLength = data.filter((data) => data.SORTIMENT === category).length;
    setFilteredProductsLength(filteredDataLength);

    const filteredAndSortedProducts = [...data]
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

  }, [data, category, mainSort, firstPostIndex, lastPostIndex]);

  const contextValue: ProductsContextProps = {

    products,
    currentPage,
    setCurrentPage,
    setPostsPerPage,
    category,
    setCategory,
    menuList,
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