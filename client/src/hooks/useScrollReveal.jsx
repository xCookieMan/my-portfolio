import { useEffect } from 'react';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Offset a bit so it triggers before bottom
      }
    );

    // Select elements to animate
    // We'll target major section containers and specific elements
    const targets = document.querySelectorAll('.about-container, .project-card, .contact-container, .home .text, .home .image-container');
    
    targets.forEach((target) => {
      target.classList.add('reveal-hidden'); // Add initial hidden state
      observer.observe(target);
    });

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, []); // Run once on mount
};

export default useScrollReveal;
