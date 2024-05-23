import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children, isAuthenticated, handleLogout }) => {
    return (
        <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
