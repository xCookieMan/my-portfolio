import React, { useState } from 'react';
import myLogo from '../assets/logo.jpg';

const BlasterWord = ({ word }) => {
  const [isBlasted, setIsBlasted] = useState(false);

  const handleBlast = (e) => {
    if (isBlasted) return;
    setIsBlasted(true);
    
    // Create a temporary shake effect on the body or container
    const container = document.querySelector('.about-container');
    if (container) {
      container.classList.add('mini-shake');
      setTimeout(() => container.classList.remove('mini-shake'), 300);
    }
  };

  return (
    <span 
      className={`blast-word ${isBlasted ? 'blasted' : ''}`} 
      onClick={handleBlast}
    >
      {word}
      {isBlasted && (
        <span className="blast-particles">
          {[...Array(12)].map((_, i) => (
            <span 
              key={i} 
              className="particle" 
              style={{ 
                '--i': i,
                '--x': `${(Math.random() - 0.5) * 200}px`,
                '--y': `${(Math.random() - 0.5) * 200}px`,
                '--rot': `${Math.random() * 360}deg`,
                '--size': `${Math.random() * 4 + 2}px`
              }}
            ></span>
          ))}
        </span>
      )}
    </span>
  );
};

const BlasterText = ({ text }) => {
  return text.split(' ').map((word, index) => (
    <React.Fragment key={index}>
      <BlasterWord word={word} />
      {' '}
    </React.Fragment>
  ));
};

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-container" id="about">
        <div className="about-img">
          <img src={myLogo} alt="About Me" />
          <div className="border-snake"></div>
        </div>
        
        <div className="about-text">
          <h1>
            <BlasterText text="About" /> <span><BlasterText text="Me" /></span>
          </h1>
          <p>
            <BlasterText text="I am a passionate developer with expertise in building modern, responsive, and user-friendly web applications. My journey involves exploring new technologies and crafting digital experiences that leave a lasting impact." />
          </p>
          <p>
            <BlasterText text="I specialize in the MERN stack (MongoDB, Express, React, Node.js) and love solving complex problems with clean code." />
          </p>
          
          <div className="highlight">
            <BlasterText text="Currently working on expanding my portfolio with full-stack projects." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
