import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    const handleClick = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <button className="btn" onClick={handleClick}>Log Out</button>
    );
};

export default LogoutButton;
