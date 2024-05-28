import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from './axiosConfig';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticatedState] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/test-token', {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                    setUser(response.data.user);
                    setIsAuthenticatedState(true);
                    localStorage.setItem('isAuthenticated', 'true');
                } catch (err) {
                    setUser(null);
                    setIsAuthenticatedState(false);
                    localStorage.setItem('isAuthenticated', 'false');
                }
            } else {
                setUser(null);
                setIsAuthenticatedState(false);
                localStorage.setItem('isAuthenticated', 'false');
            }
        };

        checkAuth();
    }, []);

    const setIsAuthenticated = (authState) => {
        setIsAuthenticatedState(authState);
        localStorage.setItem('isAuthenticated', authState.toString());
    };

    const handleLogout = async () => {
        try {
            await axios.post('/logout/');
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('token'); // Clear token from localStorage
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setIsAuthenticated, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};