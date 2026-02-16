import React, { useEffect, useState } from 'react';
import Starfield from './components/Starfield';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SkillSphere from './components/SkillSphere';
import ScrollRocket from './components/ScrollRocket';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import useScrollReveal from './hooks/useScrollReveal';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  useScrollReveal();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const smallScreen = window.innerWidth <= 768;
      setIsMobile(touch || smallScreen);
    }

    const loader = document.getElementById('initial-loader');
    if (!loader) return;
    loader.classList.add('fade-out');
    const timeout = setTimeout(() => {
      if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div id="nebula-bg"></div>
      {!isMobile && <CursorTrail />}
      {!isMobile && <ScrollRocket />}
      <Starfield />
      <Navbar />
      <Home />
      <About />
      <SkillSphere />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
