import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

import axios from 'axios';

import { useLocalStorage } from "../hooks/useLocalStorage"

type AuthProviderProps = {
    children: ReactNode;
};

interface AuthContextProps {

    setLoginRegModalInfo: (code: string, value?: string) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    toggleInfoModal: () => void;
    handleLogout: () => void;
    toggleDropdownLogin: () => void;
    getEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    userName: string;
    email: string;
    password: string;
    token: string;
    loginMessage: string[];
    modalInfo: boolean;
    isOpenLoginDropdown: boolean;
    isChecked: boolean;
};

export const AuthContext = createContext({} as AuthContextProps)

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [email, setEmail] = useLocalStorage<string>("email", "");
    const [password, setPassword] = useState<string>("");
    const [isChecked, setIsChecked] = useLocalStorage<boolean>("isChecked", false);

    const [loginMessage, setLoginMessage] = useState<string[]>(["", ""]);

    const [token, setToken] = useLocalStorage<string>("token", "")

    const [modalInfo, setModalInfo] = useState(false);

    const [userName, setUserName] = useLocalStorage<string>("userName", "");

    const [isOpenLoginDropdown, setisOpenLoginDropdown] = useState<boolean>(false);

    const toggleDropdownLogin = () => setisOpenLoginDropdown(!isOpenLoginDropdown);

    const toggleInfoModal = () => setModalInfo(!modalInfo);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (email !== "" && password !== "") {
            e.preventDefault();

            try {
                const response = await axios.post('http://localhost:5000/auth/login', { email, password });
                const token = response.data.token;

                setUserName(response.data.user.firstName + " " + response.data.user.lastName)

                setToken(token);

                setLoginRegModalInfo("successful")
                toggleDropdownLogin();


                if (!isChecked) {
                    localStorage.removeItem('email');
                }

            } catch (error) {
                //console.error('Hiba történt a bejelentkezés közben:', error);
                setLoginRegModalInfo("error")
            }
        } else {
            setLoginRegModalInfo("incomplete")
        }
    };

    const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const setLoginRegModalInfo = (code: string, value?: string) => {
        const vale = value ?? ""; // Ha a value undefined vagy null, akkor használjuk az üres stringet
        console.log([code, vale])
        setLoginMessage([code, vale]);
        toggleInfoModal();
    };

    const myFunction = () => {
        window.location.reload();
        // Átnavigálás a '/home' oldalra

    };

    console.log(token)

    const contextValue: AuthContextProps = {
        handleSubmit,
        getEmail,
        getPassword,
        email,
        password,
        token,
        handleLogout,
        loginMessage,
        toggleInfoModal,
        modalInfo,
        userName,
        isOpenLoginDropdown,
        toggleDropdownLogin,
        handleCheckboxChange,
        isChecked,
        setLoginRegModalInfo
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;