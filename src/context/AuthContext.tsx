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

    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    toggleInfoModal: () => void;
    handleLogout: () => void;
    getEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
    password: string;
    token: string;
    loginMessage: string;
    modalInfo: boolean;
};

const AuthContext = createContext({} as AuthContextProps)

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginMessage, setLoginMessage] = useState<string>("");

    const [token, setToken] = useLocalStorage<string>("token", "")

    const [modalInfo, setModalInfo] = useState(false);
    const toggleInfoModal = () => setModalInfo(!modalInfo);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (email !== "" && password !== "") {
            e.preventDefault();
            console.log("LEFUTOTTAM")
            try {
                const response = await axios.post('http://localhost:5000/auth/login', { email, password });

                const token = response.data.token;
                //const userName = response.data.firstName;
                const firstName: string[0] = response.data.user.firstName;
                const lastName: string[0] = response.data.user.lastName;
                //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setToken(token);

                setLoginMessage("successful");
                toggleInfoModal();

                console.log('Sikeres bejelentkezés, kapott token:', firstName, lastName);

            } catch (error) {
                console.error('Hiba történt a bejelentkezés közben:', error);
                setLoginMessage("error");
                toggleInfoModal();
            }
        } else {
            //alert("tölsd ki a mezöt")
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        console.log("lefutottam")
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
        modalInfo
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;