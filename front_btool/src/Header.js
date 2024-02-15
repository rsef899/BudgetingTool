import React from 'react';
import logo from './images/logo.jpg';
import NavBar from './NavBar';


function Header() {
  return (
    <header style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="logo-container" style={{ textAlign: "center" }}>
            <img src={logo} alt="Logo" style={{ width: "100px" }}/> {/* Adjust width as needed */}
            <h1 style={{ margin: "0" }}>Budget-er</h1>
        </div>
        <NavBar />
    </header>
  );
}

export default Header;
