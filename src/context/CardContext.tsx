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

    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;

    limitValue: (quantity: number) => number;
    roundToNearestMultiple: (number: number) => number;
    searchValue: (quantity: string, id: number, isSelfIncrease: boolean) => void;
    getItemQuantity: (id: number) => string;
    formatPrice: (price: number) => string;
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
    const [products] = useState<ProductDataType[]>([...data]);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        [])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const maxLimit = 999;

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
                    if (item.id === id && Number(item.quantity) < maxLimit) {
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

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const INPUT_REGEXP = /[0-9/]+/;
        if (e.key === "Backspace" || INPUT_REGEXP.test(e.key)) {
            return;
        } else {
            e.preventDefault();
        }
    };

    //max korlát 
    const limitValue = (quantity: number): number => {
        return quantity > maxLimit ? maxLimit : quantity;
    };

    const searchValue = (quantity: string, id: number, isSelfIncrease: boolean) => {


        const value = limitValue(Number(quantity));

        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: String(value) }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {

                        const quantityValue = isSelfIncrease
                            ? String(Math.floor(Number(item.quantity)) + value)
                            : String(value);

                        // Korlátozás a max ra
                        const limitedQuantityValue = parseInt(quantityValue) > maxLimit ? String(maxLimit) : quantityValue;

                        return {
                            ...item,
                            quantity: value === 0 ? '' : limitedQuantityValue,
                        };
                    }
                    return item;
                });
            }
        });
    };

    //Árak kerekitése.
    const roundToNearestMultiple = (number: number) => {
        if (number >= 1000) {
            return (Math.ceil(number / 100) * 100 - 10);
        } else if (number >= 100) {
            return Math.ceil(number / 10) * 10;
        } else {
            return number;
        }
    };

    //Árak formázása
    const formatPrice = (price: number) => {
        return price.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

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
        formatPrice,
        limitValue,
        handleKeyPress
    }

    return (
        <CardContext.Provider value={contextValue}>
            {children}
        </CardContext.Provider>
    );
};

export default CardContext;