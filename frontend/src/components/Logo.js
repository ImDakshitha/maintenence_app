import React from 'react';
import logo from './Logo.png'; 

function Logo() {
    return (
        <div className="logo">
            <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
        </div>
    );
}

export default Logo;