import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('user') !== null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

}

export default Navbar;
