import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav>
      <div className="nav-left">
        <div className="logo">Nakul</div>
        <button
          className={`menu-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={`menu ${isOpen ? 'menu-open' : ''}`}>
        <button onClick={() => handleLinkClick('#home')}>Home</button>
        <button onClick={() => handleLinkClick('#about')}>About</button>
        <button onClick={() => handleLinkClick('#projects')}>Projects</button>
        <button onClick={() => handleLinkClick('#contact')}>Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;
