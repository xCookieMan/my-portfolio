import React, { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const cursorRef = useRef(null);
  const trailsRef = useRef([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Create cursor dot
    const dot = document.createElement('div');
    dot.classList.add('cursor-dot');
    document.body.appendChild(dot);
    
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      dot.style.left = `${clientX}px`;
      dot.style.top = `${clientY}px`;
      
      // Create trail particle
      createTrail(clientX, clientY);
    };

    const createTrail = (x, y) => {
      const trail = document.createElement('div');
      trail.classList.add('cursor-trail-particle');
      
      // Randomize size and color slightly for space dust effect
      const size = Math.random() * 4 + 2;
      trail.style.width = `${size}px`;
      trail.style.height = `${size}px`;
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      
      // Space colors (Cyan, Purple, White)
      const colors = ['#00d4ff', '#ff6b81', '#ffffff', '#a855f7'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      trail.style.background = color;
      
      document.body.appendChild(trail);
      
      // Animation
      trail.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
        { transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0)`, opacity: 0 }
      ], {
        duration: 800,
        easing: 'ease-out'
      }).onfinish = () => trail.remove();
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      dot.remove();
    };
  }, []);

  return null; // This component doesn't render DOM elements directly, it appends them
};

export default CursorTrail;
