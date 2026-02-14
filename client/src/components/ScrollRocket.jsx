import React, { useState, useEffect } from 'react';

const ScrollRocket = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`scroll-rocket ${visible ? 'visible' : ''}`} 
      onClick={scrollToTop}
    >
      🚀
      <div className="rocket-fire"></div>
    </div>
  );
};

export default ScrollRocket;
