import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from './axiosConfig';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : 'null';
    });
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
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                } catch (err) {
                    setUser(null);
                    setIsAuthenticatedState(false);
                    localStorage.setItem('isAuthenticated', 'false');
                    localStorage.setItem('user', null);
                    console.log("err1:", err)

                }
            } else {
                setUser(null);
                setIsAuthenticatedState(false);
                localStorage.setItem('isAuthenticated', 'false');
                localStorage.setItem('user', null);
                console.log("err2")

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
            localStorage.removeItem('token');
            localStorage.setItem('user', null);

        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ setUser, user, isAuthenticated, setIsAuthenticated, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};