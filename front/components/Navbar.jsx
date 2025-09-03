import React from 'react';
import logo from "../src/assets/logo.png"

const Navbar = () => {
    return (
        <nav
            className="w-full flex justify-between items-center p-8 bg-opacity-90 shadow-md fixed top-0 left-0 z-30"
            style={{ backgroundColor: "#e7ebf3" }}
        >
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-12 w-32 object-contain" />          
            </div>
        </nav>
    );
};

export default Navbar;
