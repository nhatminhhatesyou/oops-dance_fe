import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Instructor from './Components/Users/Instructor/Instructor';
import HomePage from './Components/HomePage/HomePage';
import Admin from './Components/Users/Admin/Admin';
import axios from './axiosConfig';
import LogoutButton from './Components/Logout/LogoutButton';

import { AuthProvider } from './AuthContext';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('/test-token/');
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthProvider isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
            <Router>
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/logout" element={<LogoutButton />} />
                            <Route path="/instructor" element={<Instructor />} />
                            <Route path="/admin/*" element={<Admin />} />
                            <Route path="*" element={<Navigate to="/home" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
                            <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                    <Route path="/home" element={<HomePage />} />

                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
