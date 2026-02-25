import React, { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    const isMobile = window.innerWidth < 768;
    const numStars = isMobile ? 150 : 400; // Reduced star count for mobile performance
    let animationFrameId;

    const colors = ['#ffffff', '#ffe9c4', '#d4fbff', '#e0c3fc']; // White, Warm, Cyan, Light Purple

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * (isMobile ? 1 : 1.5) + 0.5, // Smaller stars on mobile
        speed: Math.random() * 0.5 + 0.1, // Slower, more majestic speed
        alpha: Math.random(),
        delta: Math.random() * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const animate = () => {
      // Clear canvas to let CSS background show through
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Stars
      stars.forEach((star) => {
        star.alpha += star.delta;
        if (star.alpha <= 0.2 || star.alpha >= 1) star.delta *= -1; // Keep some visibility
        
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0; // Reset alpha
        
        star.y -= star.speed;
        if (star.y < 0) {
            star.y = canvas.height;
            star.x = Math.random() * canvas.width;
        }
      });

      // Random Shooting Star - Reduced frequency on mobile
      const shootingStarChance = isMobile ? 0.005 : 0.015;
      if (Math.random() < shootingStarChance) { 
        createShootingStar();
      }
      
      updateShootingStars();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    let shootingStars = [];
    const createShootingStar = () => {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2, 
            length: Math.random() * 80 + 20,
            speed: Math.random() * 10 + 10,
            angle: Math.PI / 4,
            color: '#ffffff'
        });
    };

    const updateShootingStars = () => {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const star = shootingStars[i];
            star.x += star.speed * Math.cos(star.angle);
            star.y += star.speed * Math.sin(star.angle);
            
            // Draw shooting star
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, 0.8)`;
            ctx.lineWidth = 2;
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star.x - star.length * Math.cos(star.angle), star.y - star.length * Math.sin(star.angle));
            ctx.stroke();

            // Remove if out of bounds
            if (star.x > canvas.width || star.y > canvas.height) {
                shootingStars.splice(i, 1);
            }
        }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="space" ref={canvasRef} />;
};

export default Starfield;
