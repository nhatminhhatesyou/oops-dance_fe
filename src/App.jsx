import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Instructor from './Components/Users/Instructor/Instructor';
import HomePage from './Components/HomePage/HomePage';
import Admin from './Components/Users/Admin/Admin';
import { AuthProvider, useAuth } from './AuthContext';
import LogoutButton from './Components/Logout/LogoutButton';
// import TableTemplate from './Components/Table/TableTemplate';

const AppRoutes = () => {
    const { user, isAuthenticated } = useAuth();
    // console.log("USER:", user)
    // console.log("auth:", isAuthenticated)
    // console.log("LocalStorage user:", localStorage.getItem('user'))

    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    {/* <Route path="/user-manager" element={<TableTemplate />} /> */}
                    <Route path="/logout" element={<LogoutButton />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="*" element={<Navigate to="/home" />} />

                    {user.role === 'instructor' ? (
                        <>
                            <Route path="/instructor/*" element={<Instructor />} />
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