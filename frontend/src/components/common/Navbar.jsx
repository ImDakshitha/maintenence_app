import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import './Navbar.css';

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Logout this user?');
        if (confirmDelete) {
            UserService.logout();
        }
    };

    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">HOME</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAuthenticated && <li><Link to="/dashboard">Maintenance Dashboard</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;
