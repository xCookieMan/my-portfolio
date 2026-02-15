import React, { useEffect } from 'react';
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
  useScrollReveal();

  useEffect(() => {
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
      <CursorTrail />
      <ScrollRocket />
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
