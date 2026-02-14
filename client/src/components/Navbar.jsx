import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">Nakul</div>
      <div className="menu">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
