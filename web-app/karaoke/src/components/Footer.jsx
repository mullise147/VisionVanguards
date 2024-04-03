import React from 'react';
import "../assets/styles/footer.css"; 
import "../index.css"; 

const Footer = () => {
  const footerStyle = {
    fontSize: '18px', // Adjust the font size as needed
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <br></br>
        <br></br>
        <br></br>
        <p style={footerStyle}>Developed by: The Vision Vanguards</p>
        <ul>
          <li><a href="mailto:lnuas@mail.uc.edu">Athulya Ganesh</a></li>
          <li><a href="mailto:kelly2r@mail.uc.edu">Rob Kelly</a></li>
          <li><a href="mailto:mullise@mail.uc.edu">Stephanie Mullins</a></li>
          <li><a href="mailto:aurisajm@ucmail.uc.edu">Advisor: Dr. Jillian Aurisano</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
