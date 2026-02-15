import React, { useRef } from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "YouTube Clone",
      desc: "A responsive video streaming platform featuring video playback, channel pages, and search functionality. Built with React and RapidAPI.",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://your-youtube-live-url.com",
      codeUrl: "https://github.com/xCookieMan/youtube-clone"
    },
    {
      id: 2,
      title: "Restaurant Website",
      desc: "Full-stack restaurant management system with table booking, menu visualization, and admin dashboard. Powered by MERN stack.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://your-restaurant-live-url.com",
      codeUrl: "https://github.com/xCookieMan/restaurant"
    },
    {
      id: 3,
      title: "AI Thumbnail Studio",
      desc: "AI-powered application for generating creative thumbnails and images. Features user authentication and gallery management.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://your-ai-thumbnail-live-url.com",
      codeUrl: "https://github.com/xCookieMan/ai-thumbnail-studio"
    }
  ];

  const handleMouseEnter = (e) => {
    const button = e.currentTarget;
    if (button.classList.contains('hover-active')) return;
    
    button.classList.add('hover-active');
    
    // Select UFOs within this specific button
    const bigUfo = button.querySelector('.ufo.big');
    const smallUfos = button.querySelectorAll('.ufo.small');
    
    const ufos = [
      {
        el: bigUfo,
        midX: 20,
        endX: 180,
        speedMid: 1500,
        speedEnd: 800,
        delay: 0,
        topShift: -20,
      },
      {
        el: smallUfos[0],
        midX: 20,
        endX: 180,
        speedMid: 1500,
        speedEnd: 800,
        delay: 0,
        topShift: -15,
      },
      {
        el: smallUfos[1],
        midX: 20,
        endX: 180,
        speedMid: 1500,
        speedEnd: 800,
        delay: 1500,
        topShift: -25,
      },
      {
        el: smallUfos[2],
        midX: 20,
        endX: 180,
        speedMid: 1500,
        speedEnd: 800,
        delay: 2000,
        topShift: -10,
      },
    ];

    // Reset and Animate
    ufos.forEach(ufo => {
        if(!ufo.el) return;
        
        // Reset
        ufo.el.style.transition = "none";
        ufo.el.style.transform = `translateY(-50%) translateX(-50px)`;
        ufo.el.style.opacity = 0;

        // Animate
        setTimeout(() => {
            ufo.el.style.transition = `transform ${ufo.speedMid}ms ease-in-out, opacity 0.2s`;
            ufo.el.style.transform = `translateY(${ufo.topShift}px) translateX(${ufo.midX}px)`;
            ufo.el.style.opacity = 1;
        }, ufo.delay);

        setTimeout(() => {
            ufo.el.style.transition = `transform ${ufo.speedEnd}ms cubic-bezier(0.9,0,0.1,1)`;
            ufo.el.style.transform = `translateY(-50%) translateX(${ufo.endX}px)`;
        }, ufo.delay + ufo.speedMid + 50);

        // Trails
        const intervalId = setInterval(() => createTrail(ufo), 150);
        
        // Store interval ID on the element to clear later
        if (!button.trailIntervals) button.trailIntervals = [];
        button.trailIntervals.push(intervalId);
    });
  };

  const handleMouseLeave = (e) => {
    const button = e.currentTarget;
    button.classList.remove('hover-active');
    
    // Clear trail intervals
    if (button.trailIntervals) {
        button.trailIntervals.forEach(clearInterval);
        button.trailIntervals = [];
    }

    // Reset UFOs
    const ufos = button.querySelectorAll('.ufo');
    ufos.forEach(el => {
        el.style.transition = "none";
        el.style.transform = `translateY(-50%) translateX(-50px)`;
        el.style.opacity = 0;
    });
  };

  const createTrail = (ufo) => {
    if (!ufo.el || !ufo.el.parentElement) return;

    const rect = ufo.el.getBoundingClientRect();
    const parent = ufo.el.parentElement.getBoundingClientRect();
    
    // Safety check if element is no longer in DOM
    if (rect.width === 0 && rect.height === 0) return;

    const count = Math.floor(Math.random() * 2) + 1;
    
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      dot.classList.add("trail");
      ufo.el.parentElement.appendChild(dot);
      
      dot.style.left = `${rect.left - parent.left + rect.width / 2}px`;
      dot.style.top = `${rect.top - parent.top + rect.height / 2}px`;
      
      const angle = Math.random() * 20 - 10;
      const distance = Math.random() * 15 + 5;
      const duration = Math.random() * 0.4 + 0.2;
      
      dot.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
      
      // Force reflow to ensure transition happens
      void dot.offsetWidth;

      setTimeout(() => {
        dot.style.transform = `translate(${distance}px, ${angle}px)`;
        dot.style.opacity = 0;
        setTimeout(() => {
            if(dot.parentElement) dot.remove();
        }, duration * 1000);
      }, 10);
    }
  };

  return (
    <div className="projects-section" id="projects">
      <h1 className="section-title">My <span>Projects</span></h1>
      
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="card-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-info">
              <h2>{project.title}</h2>
              <p>{project.desc}</p>
              <div className="button-container">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn-link"
                >
                  <button 
                    className="view-btn" 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                  >
                    View Project
                    <div className="ufo big"></div>
                    <div className="ufo small"></div>
                    <div className="ufo small"></div>
                    <div className="ufo small"></div>
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
