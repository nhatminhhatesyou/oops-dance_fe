import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Instructor from './Components/Users/Instructor & Guest/Instructor';
import HomePage from './Components/HomePage/HomePage';
import Admin from './Components/Users/Admin & Staff/Admin';
import { AuthProvider, useAuth } from './AuthContext';
import LogoutButton from './Components/Logout/LogoutButton';
// import TableTemplate from './Components/Table/TableTemplate';

const AppRoutes = () => {
    const { user, isAuthenticated } = useAuth();

    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    <Route path="/logout" element={<LogoutButton />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="*" element={<Navigate to="/home" />} />

                    {user.role === 'instructor' || user.role === 'guest' ? (
                        <>
                            <Route path="/profile/*" element={<Instructor />} />
                            <Route path="/admin/*" element={<Admin />} />

                        </>
                    ) : user.role === 'admin' ? (
                        <>
                            <Route path="/admin/*" element={<Admin />} />
                        </>
                    ) : null}

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