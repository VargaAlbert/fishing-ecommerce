import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    ChangeEvent,
} from "react";

type AuthProviderProps = {
    children: ReactNode;
};

interface AuthContextProps {

};

const AuthContext = createContext({} as AuthContextProps)

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const contextValue: AuthContextProps = {

    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;