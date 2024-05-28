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
    // Khởi tạo isAuthenticated từ localStorage
    console.log("Initial isAuthenticated from localStorage:", localStorage.getItem('isAuthenticated') === 'true')
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    console.log("Authen :", isAuthenticated)


    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/test-token/', {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                    console.log("Server Response:", response.data);
                    setIsAuthenticated(true);
                    localStorage.setItem('isAuthenticated', 'true');
                } catch (err) {
                    if (err.response) {
                        console.log("Server Error Response:", err.response.data);
                    } else if (err.request) {
                        console.log("Request Error:", err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                    setIsAuthenticated(false);
                    localStorage.setItem('isAuthenticated', 'false');
                }
            } else {
                setIsAuthenticated(false);
                localStorage.setItem('isAuthenticated', 'false');
            }
        };

        checkAuth();
        console.log("Authen :", isAuthenticated)

    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        localStorage.setItem('isAuthenticated', 'false');
        console.log("LOG OUT")
    };

    return (
        <AuthProvider isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
            <Router>
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/logout" element={<LogoutButton />} />
                            <Route path="/instructor/*" element={<Instructor />} />
                            <Route path="/admin/*" element={<Admin />} />
                            <Route path="/" element={<Navigate to="/instructor" />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="*" element={<Navigate to="/home" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
                            <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/" element={<Navigate to="/login" />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;