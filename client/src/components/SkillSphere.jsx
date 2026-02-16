import React, { useEffect, useRef } from 'react';

const SkillSphere = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const smallScreen = window.innerWidth <= 768;
      if (touch || smallScreen) {
        return;
      }
    }

    const container = containerRef.current;
    
    // Define skills with their specific colors
    const skillsData = [
      { name: "React", color: "#61dafb" },      // React Blue
      { name: "Node.js", color: "#68a063" },    // Node Green
      { name: "MongoDB", color: "#4db33d" },    // Mongo Green
      { name: "Express", color: "#ffffff" },    // White (Standard for Express in dark mode)
      { name: "JavaScript", color: "#f7df1e" }, // JS Yellow
      { name: "HTML5", color: "#e34c26" },      // HTML Orange
      { name: "CSS3", color: "#264de4" },       // CSS Blue
      { name: "Git", color: "#f05032" },        // Git Red-Orange
      { name: "Redux", color: "#764abc" },      // Redux Purple
      { name: "API", color: "#00d4ff" },        // Cyan (Generic Tech)
      { name: "UI/UX", color: "#ff61f6" },      // Pink
      { name: "Figma", color: "#f24e1e" },      // Figma Red
      { name: "Sass", color: "#c69" },          // Sass Pink
      { name: "Bootstrap", color: "#563d7c" },  // Bootstrap Purple
      { name: "Tailwind", color: "#38b2ac" },   // Tailwind Teal
      { name: "MERN", color: "#42b883" }        // Vue/MERN Greenish
    ];

    const options = {
      radius: 250,
      maxSpeed: 'fast',
      initSpeed: 'normal',
      direction: 135,
      keep: true
    };

    // Simple 3D Tag Cloud Logic (simplified version of TagCanvas)
    let tags = [];
    const size = options.radius * 2;
    
    // Create DOM elements
    container.innerHTML = '';
    container.style.width = `${size}px`;
    container.style.height = `${size}px`;
    container.style.position = 'relative';
    container.style.perspective = '1000px';
    container.style.margin = '0 auto';

    skillsData.forEach((skill, i) => {
      const el = document.createElement('div');
      el.textContent = skill.name;
      el.style.position = 'absolute';
      el.style.left = '50%';
      el.style.top = '50%';
      el.style.transformStyle = 'preserve-3d';
      el.style.color = skill.color; // Use specific color
      el.style.fontSize = '18px';
      el.style.fontWeight = 'bold';
      el.style.textShadow = `0 0 10px ${skill.color}`; // Glow matches color
      el.style.cursor = 'pointer';
      el.className = 'tag-cloud-item';
      container.appendChild(el);

      // Spherical coordinates
      const phi = Math.acos(-1 + (2 * i) / skillsData.length);
      const theta = Math.sqrt(skillsData.length * Math.PI) * phi;

      tags.push({
        el,
        x: options.radius * Math.cos(theta) * Math.sin(phi),
        y: options.radius * Math.sin(theta) * Math.sin(phi),
        z: options.radius * Math.cos(phi)
      });
    });

    let angleX = 0.005;
    let angleY = 0.005;

    const animate = () => {
      angleX = 0.002;
      angleY = 0.002;

      tags.forEach(tag => {
        // Rotate X
        const y1 = tag.y * Math.cos(angleX) - tag.z * Math.sin(angleX);
        const z1 = tag.z * Math.cos(angleX) + tag.y * Math.sin(angleX);
        tag.y = y1;
        tag.z = z1;

        // Rotate Y
        const x2 = tag.x * Math.cos(angleY) - tag.z * Math.sin(angleY);
        const z2 = tag.z * Math.cos(angleY) + tag.x * Math.sin(angleY);
        tag.x = x2;
        tag.z = z2;

        // Apply transform
        const scale = (options.radius + tag.z) / (options.radius * 2) + 0.5;
        const alpha = (tag.z + options.radius) / (2 * options.radius);
        
        tag.el.style.transform = `translate3d(${tag.x}px, ${tag.y}px, ${tag.z}px) scale(${scale})`;
        tag.el.style.opacity = alpha + 0.2;
        tag.el.style.zIndex = Math.floor(tag.z);
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="skill-sphere-section" id="skills">
        <h2 className="section-title">Holographic <span>Skills</span></h2>
        <div className="sphere-wrapper" ref={containerRef}></div>
    </div>
  );
};

export default SkillSphere;
