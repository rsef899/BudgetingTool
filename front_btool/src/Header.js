import React from 'react';
import logo from './images/logo.jpg';
import './Functionality.css';

function Header() {
  return (
    <header>
        <div className = "logo-container">
            <img src={logo} alt="Logo" className='logo'/>
            <h1 className='header-text'>Budget-er</h1>
        </div>
    </header>
  );
}

export default Header;