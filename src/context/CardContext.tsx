import React, {
    createContext,
    useContext,
    useState,
    ReactNode
} from "react";

import { data, ProductDataType } from "../data/Data";
import { useLocalStorage } from "../hooks/useLocalStorage"

type CardProviderProps = {
    children: ReactNode;
};

type CartItem = {
    id: number
    quantity: string
}

type CardContextProps = {
    products: ProductDataType[];
    cartItems: CartItem[];

    roundToNearestMultiple: (number: number) => number;
    searchValue: (quantity: string, id: number, isSelfIncrease: boolean) => void;
    getItemQuantity: (id: number) => string;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    handleClose: () => void;
    handleShow: () => void;

    cartQuantity: number
    show: boolean;
};

const CardContext = createContext({} as CardContextProps)

export const useCardContext = () => {
    return useContext(CardContext);
};

export const CardProvider: React.FC<CardProviderProps> = ({ children }) => {
    const [products] = useState<ProductDataType[]>(data);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        [])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    /* --Copyright (c) 2022 WebDevSimplified-- */
    const getItemQuantity = (id: number) => {
        return cartItems.find((item) => item.id === id)?.quantity || "0";
    };

    /* --Copyright (c) 2022 WebDevSimplified-- */
    const increaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: "1" }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: String(Number(item.quantity) + 1) };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    /* --Copyright (c) 2022 WebDevSimplified-- */
    const decreaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === "1") {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: String(Number(item.quantity) - 1) };
                    } else {
                        return item;
                    }
                });
            }
        });
    };
    /* --Copyright (c) 2022 WebDevSimplified-- */
    const removeFromCart = (id: number) => {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id);
        });
    };

    /* --Copyright (c) 2022 WebDevSimplified-- */
    const cartQuantity = cartItems.reduce(
        (quantity, item) => Number(item.quantity) + Number(quantity),
        0
    );



    const searchValue = (quantity: string, id: number, isSelfIncrease: boolean) => {

        const limitValue = (quantity: number): number => {
            return quantity > 999 ? 999 : quantity;
        };

        const value = limitValue(Number(quantity));

        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: String(value) }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        if (isSelfIncrease) {
                            if (value === 0) {
                                return {
                                    ...item, quantity: "",
                                };
                            } else {
                                return {
                                    ...item, quantity: String(Number(item.quantity) + value),
                                };
                            }
                        } else {
                            if (value === 0) {
                                return {
                                    ...item, quantity: "",
                                };
                            } else {
                                return {
                                    ...item, quantity: String(value),
                                };
                            }
                        }
                    } else {
                        return item;
                    }
                });
            }
        });
    };

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
        cartQuantity,
        searchValue,
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