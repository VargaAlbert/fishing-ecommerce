import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { data } from "../data/Data";
import { useLocalStorage } from "../hooks/useLocalStorage"

export type ProductData = {
    ID_PRODUC: number;
    EAN: number;
    PRODUCT: string;
    SKUPINA: number;
    ROZMER: string;
    DESCRIPTION: string;
    IMGURL_NO_WATER: string;
    CENA_S_DPH_EU_HUF: number;
    SORTIMENT: string;
};

type CardProviderProps = {
    children: ReactNode;
};


type CartItem = {
    id: number
    quantity: number
}

type CardContextProps = {
    products: ProductData[];
    cartItems: CartItem[];
    roundToNearestMultiple: (number: number) => number;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    handleClose: () => void;
    handleShow: () => void;
    show: boolean;
};

const CardContext = createContext({} as CardContextProps)

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


    /* --Copyright (c) 2022 WebDevSimplified-- */
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

    const decreaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id);
        });
    };

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + Number(quantity),
        0
    );
    /* --Copyright (c) 2022 WebDevSimplified--end-- */

    useEffect(() => {
        if (cartQuantity > 1) {
            handleShow();
            setTimeout(() => {
                handleClose();
            }, 1000);
        }
    }, [cartQuantity]);

    //Árak kerekitése.
    const roundToNearestMultiple = (number: number) => {
        if (number >= 1000) {
            return Math.ceil(number / 100) * 100 - 10;
        } else if (number >= 100) {
            return Math.ceil(number / 10) * 10;
        } else {
            return number;
        }
    };

    const contextValue: CardContextProps = {
        products,
        cartItems,
        show,
        handleClose,
        handleShow,
        getItemQuantity,
        decreaseCartQuantity,
        increaseCartQuantity,
        removeFromCart,
        roundToNearestMultiple,
    }

    return (
        <CardContext.Provider value={contextValue}>
            {children}
        </CardContext.Provider>
    );
};

export default CardContext;