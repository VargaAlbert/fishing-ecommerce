import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { data } from "../data/Data";
import { useLocalStorage } from "../hooks/useLocalStorage"
import { type } from "os";

export type ProductData = {
    ID_PRODUC: number;
    EAN: number;
    PRODUCT: string;
    SKUPINA: number;
    ROZMER: string;
    IMGURL_NO_WATER: string;
    CENA_S_DPH_EU_HUF: number;
    SORTIMENT: string;
};

type CardProviderProps = {
    children: ReactNode;
};

type CardContextProps = {
    products: ProductData[];
};

type CartItem = {
    id: number
    quantity: number
}

const CardContext = createContext<CardContextProps>({
    products: []
});

export const useCardContext = () => {
    return useContext(CardContext);
};

export const CardProvider: React.FC<CardProviderProps> = ({ children }) => {
    const [products] = useState<ProductData[]>(data);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        [])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    /* ------ */
    const getItemQuantity = (id: number) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    };

    const increaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const contextValue: CardContextProps = {
        products
    }

    return (
        <CardContext.Provider value={contextValue}>
            {children}
        </CardContext.Provider>
    );
};

export default CardContext;