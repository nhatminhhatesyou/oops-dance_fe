import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Instructor from './Components/Users/Instructor/Instructor';
import HomePage from './Components/HomePage/HomePage';
import Admin from './Components/Users/Admin/Admin';
import { AuthProvider, useAuth } from './AuthContext';
import LogoutButton from './Components/Logout/LogoutButton';

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
    console.log("auth?: ", isAuthenticated)

    return (
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </>
            )}
        </Routes>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

export default App;