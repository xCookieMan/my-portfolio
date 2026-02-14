import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.jpg';

const Home = () => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const rotatorRef = useRef(null);

  const techWords = ['Full Stack Developer', 'UI/UX Designer', 'Web Designer', 'Freelancer'];
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBetween = 2000;

  useEffect(() => {
    const currentWord = techWords[wordIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
      } else {
        setText(currentWord.substring(0, text.length - 1));
      }
    };

    let timer;
    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % techWords.length);
    } else {
      timer = setTimeout(handleTyping, isDeleting ? erasingSpeed : typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="home" id="home">
      <div className="text">
        <h1>Hey, <span>My name</span> <span className="glitch" data-text="Nakul">Nakul</span></h1>
        <h2>And I am a <span id="rotator" ref={rotatorRef}>{text}</span></h2>
      </div>
      <div className="image-container">
        <div className="planet-wrapper">
          <img 
            src={logo} 
            alt="logo" 
            className="main-logo"
          />
        </div>
        
        <div className="orbit-line"></div>
        <div className="orbit-dot"></div>
      </div>
    </div>
  );
};

export default Home;
