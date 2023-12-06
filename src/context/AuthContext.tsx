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
    loginMessage: string;
    modalInfo: boolean;
    isOpenLogin: boolean;
    isChecked: boolean;
};

const AuthContext = createContext({} as AuthContextProps)

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [email, setEmail] = useLocalStorage<string>("email", "");
    const [password, setPassword] = useState<string>("");
    const [isChecked, setIsChecked] = useLocalStorage<boolean>("isChecked", false);

    const [loginMessage, setLoginMessage] = useState<string>("");

    const [token, setToken] = useLocalStorage<string>("token", "")

    const [modalInfo, setModalInfo] = useState(false);

    const [userName, setUserName] = useState<string>("");

    const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);

    const toggleDropdownLogin = () => setIsOpenLogin(!isOpenLogin);

    const toggleInfoModal = () => setModalInfo(!modalInfo);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (email !== "" && password !== "") {
            e.preventDefault();

            try {
                const response = await axios.post('http://localhost:5000/auth/login', { email, password });

                const token = response.data.token;
                //const userName = response.data.firstName;
                const firstName: string[0] = response.data.user.firstName;
                const lastName: string[0] = response.data.user.lastName;
                //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setUserName(response.data.user.firstName + " " + response.data.user.lastName)

                setToken(token);

                setLoginMessage("successful");
                toggleInfoModal();
                toggleDropdownLogin();

                if (!isChecked) {
                    localStorage.removeItem('email');
                }

            } catch (error) {
                console.error('Hiba történt a bejelentkezés közben:', error);
                setLoginMessage("error");
                toggleInfoModal();
            }
        } else {
            setLoginMessage("incomplete");
            toggleInfoModal();
            console.log(modalInfo)
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
        isOpenLogin,
        toggleDropdownLogin,
        handleCheckboxChange,
        isChecked,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;