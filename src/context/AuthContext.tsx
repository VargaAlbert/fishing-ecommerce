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

    getEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
    password: string;
    token: string;
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
        e.preventDefault();
        console.log("LEFUTOTTAM")
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });

            const token = response.data.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setToken(token);

            setLoginMessage("successful");
            toggleInfoModal();
            console.log('Sikeres bejelentkezés, kapott token:', token);

        } catch (error) {
            console.error('Hiba történt a bejelentkezés közben:', error);
            setLoginMessage("error");
            toggleInfoModal();
        }
    };

    const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const contextValue: AuthContextProps = {
        handleSubmit,
        getEmail,
        getPassword,
        email,
        password,
        token
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;