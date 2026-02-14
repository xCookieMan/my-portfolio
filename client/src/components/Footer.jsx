import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="glass-footer">
      <div className="footer-inner">
        <div className="copyright">
          &copy; {new Date().getFullYear()} Nakul. All rights reserved.
        </div>
        <div className="socials">
          <a href="#" className="social-link"><FaGithub /> GitHub</a>
          <a href="#" className="social-link"><FaLinkedin /> LinkedIn</a>
          <a href="#" className="social-link"><FaInstagram /> Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
