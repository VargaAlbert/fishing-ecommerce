import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    ChangeEvent,
    useEffect,
} from "react";
import axios from 'axios';

import { useAuthContext } from "./AuthContext";

import { ProductDataType, fetchData } from "../data/dataType";
import { useLocalStorage } from "../hooks/useLocalStorage"

type CardProviderProps = {
    children: ReactNode;
};

type CartItem = {
    id: number
    quantity: string
}

interface CardContextProps {
    products: ProductDataType[];
    cartItems: CartItem[];

    setNumberValue: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
    handleBlur: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;

    setValue: (id: number) => string;
    limitValue: (quantity: number) => number;
    roundToNearestMultiple: (number: number) => number;
    searchValue: (quantity: string, id: number, isSelfIncrease: boolean) => void;
    getItemQuantity: (id: number) => string;
    formatPrice: (price: number) => string;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;

    cardSum: (shippingFeeBool: boolean) => string;

    handleClose: () => void;
    handleShow: () => void;

    shippingFee: number;
    cartQuantity: number;
    show: boolean;
};

const CardContext = createContext({} as CardContextProps)

export const useCardContext = () => {
    return useContext(CardContext);
};

let dataa: ProductDataType[] = []
const getData = async () => {
    dataa = await fetchData();
};
getData();

export const CardProvider: React.FC<CardProviderProps> = ({ children }) => {

    /*     const {
            token
        } = useAuthContext(); */

    console.log(dataa)
    const [products] = useState<ProductDataType[]>(dataa);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        [])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const maxLimit = 999;
    const shippingFee = 1290;

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
        if (INPUT_REGEXP.test(e.key) ||
            e.key === "Backspace" ||
            e.key === "ArrowRight" ||
            e.key === "ArrowLeft") {
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

    const handleBlur = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        if (Number(e.target.value) < 1) {
            searchValue("1", id, false);
        } else {
            searchValue(String(Math.abs(Number(e.target.value))), id, false);
        }
    }

    const setNumberValue = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        e.target.value === "" ?
            (searchValue(" ", id, false))
            : (searchValue(String(Math.floor(Math.abs(Number(e.target.value)))), id, false));
    }

    const setValue = (id: number) => {
        if (cartItems) {
            const foundItem = cartItems.find((item) => item.id === id);
            if (foundItem) {
                return foundItem.quantity
            }
        }
        return "0";
    }

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

    const cardSum = (shippingFeeBool: Boolean) => {
        const value = cartItems
            .reduce((total, cartItem) => {
                const item = products.find(
                    (i) => i.ID_PRODUC === cartItem.id
                );
                return (
                    total +
                    roundToNearestMultiple(item?.CENA_S_DPH_EU_HUF || 0) *
                    Number(cartItem.quantity)
                );
            }, 0)

        if (shippingFeeBool) {
            return formatPrice(value + shippingFee);
        } else {
            return formatPrice(value);
        }
    }

    const token: string | null = localStorage.getItem("token");

    console.log("lényeg", token)
    // A useEffect figyeli a cartItems változást
    useEffect(() => {
        //const userId = getUserId(); // Felhasználó azonosítójának megszerzése

        // A kosár frissítése az adatbázisban
        const updateCart = async (token: string, cartItems: CartItem[]) => {
            try {
                // API-hívás az adatok frissítéséhez
                await axios.post('http://localhost:5000/update-cart', { token, cartItems });
                console.log('A kosár sikeresen frissült az adatbázisban.');
            } catch (error) {
                console.error('Hiba történt a kosár frissítése közben:', error);
            }
        };

        // A változás kezelése, és a kosár frissítése
        if (token !== null) {
            const modifiedToken = token.substring(1, token.length - 1);
            updateCart(modifiedToken, cartItems);
        } else {
            updateCart("", cartItems);
        }
    }, [cartItems]);


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
        handleKeyPress,
        cardSum,
        handleBlur,
        setNumberValue,
        setValue,
        shippingFee,
    }

    return (
        <CardContext.Provider value={contextValue}>
            {children}
        </CardContext.Provider>
    );
};

export default CardContext;