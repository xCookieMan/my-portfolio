import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  const btnRef = useRef(null);
  const aimRef = useRef(null);
  const formRef = useRef(null);
  
  // New smooth tracking state
  const mousePos = useRef({ x: 0, y: 0 });
  const aimPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef();

  // Smoothing animation loop
  const animateAim = () => {
    if (aimRef.current && btnRef.current) {
      // Linear interpolation (lerp) for buttery smooth movement
      // 0.1 means it covers 10% of the distance every frame
      aimPos.current.x += (mousePos.current.x - aimPos.current.x) * 0.15;
      aimPos.current.y += (mousePos.current.y - aimPos.current.y) * 0.15;

      aimRef.current.style.transform = `translate3d(${aimPos.current.x}px, ${aimPos.current.y}px, 0) translate(-50%, -50%)`;
    }
    requestRef.current = requestAnimationFrame(animateAim);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateAim);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const createStarTrail = (inputElement) => {
    if (!formRef.current) return;
    
    const rect = inputElement.getBoundingClientRect();
    const parentRect = formRef.current.getBoundingClientRect();
    
    const star = document.createElement("div");
    star.classList.add("trail");
    star.style.background = `hsl(${Math.random() * 360},80%,70%)`;
    star.style.left = `${rect.left - parentRect.left + Math.random() * rect.width}px`;
    star.style.top = `${rect.top - parentRect.top + Math.random() * rect.height}px`;
    
    formRef.current.appendChild(star);
    
    const dx = (Math.random() - 0.5) * 20;
    const dy = -Math.random() * 20 - 5;
    
    star.animate(
      [
        { transform: `translate(0,0)`, opacity: 1 },
        { transform: `translate(${dx}px,${dy}px)`, opacity: 0 },
      ],
      { duration: 500 + Math.random() * 300, easing: "ease-out" }
    );
    
    setTimeout(() => star.remove(), 900);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    createStarTrail(e.target);
  };

  const createBlastEffect = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const count = 20;
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "blast-particle";
      
      // Random direction and distance
      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 100;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.background = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`; // Blue/Cyan tones
      
      btnRef.current.appendChild(particle);
      
      setTimeout(() => particle.remove(), 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createBlastEffect(); // Trigger blast on click
    setStatus('sending');

    // Simulate transmission delay for effect
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
      const response = await axios.post(`${API_BASE}/api/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false,
      });
      if (response.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleMouseMove = (e) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseEnter = () => {
    if (aimRef.current) {
      aimRef.current.style.opacity = '1';
      aimRef.current.style.scale = '1';
    }
  };

  const handleMouseLeave = () => {
    if (aimRef.current) {
      aimRef.current.style.opacity = '0';
      aimRef.current.style.scale = '0.5';
    }
  };

  return (
    <div id="contact">
      <div className="planet-container">
        <div className="planet"></div>
      </div>
      
      <div className="hologram-container">
        <div className="hologram-base"></div>
        <div className={`contact-form ${status === 'sending' ? 'transmitting' : ''}`} ref={formRef}>
            
            {status === 'sending' && (
            <div className="transmission-overlay">
                <div className="radar-sweep"></div>
                <div className="status-text">TRANSMITTING SIGNAL...</div>
            </div>
            )}

            {status === 'success' && (
                <div className="success-overlay">
                    <div className="check-icon">✓</div>
                    <div className="status-text">TRANSMISSION COMPLETE</div>
                </div>
            )}

            <div className="flying-saucer">
            <div className="head"></div>
            <div className="lights"></div>
            </div>
            
            <h2 className="glitch" data-text="Contact Me">Contact Me</h2>
            
            <form onSubmit={handleSubmit} style={{ opacity: status === 'sending' || status === 'success' ? 0.2 : 1, transition: '0.5s' }}>
            <div className="input-group">
                <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                />
                <label>Name</label>
            </div>
            
            <div className="input-group">
                <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                />
                <label>Email</label>
            </div>
            
            <div className="input-group">
                <textarea 
                name="message" 
                rows="4" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                ></textarea>
                <label>Your Message</label>
            </div>
            
            <button 
                type="submit" 
                className="send-btn" 
                disabled={status === 'sending'}
                ref={btnRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {status === 'sending' ? 'SENDING...' : 'SEND'}
                <div className="aim-lock" ref={aimRef}>
                  <span className="corner tl"></span>
                  <span className="corner tr"></span>
                  <span className="corner bl"></span>
                  <span className="corner br"></span>
                  <div className="center-dot"></div>
                </div>
            </button>
            <div className="hologram-lines"></div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
