import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  // Estado para abrir/cerrar el menú hamburguesa en celulares
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Función para hacer scroll suave al hacer clic en el menú
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false); // Cierra el menú móvil al hacer clic
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="navbar-container">
        <a href="#" className="navbar-logo" onClick={(e) => handleLinkClick(e, 'app-top')}>
          Providencia <span className="logo-accent">Empleo</span>
        </a>
        
        {/* Botón hamburguesa para celulares */}
        <button 
          className={`navbar-toggle ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="#nosotros" className="navbar-link" onClick={(e) => handleLinkClick(e, 'nosotros-section')}>
              Nosotros
            </a>
          </li>
          <li className="navbar-item">
            <a href="#servicios" className="navbar-link" onClick={(e) => handleLinkClick(e, 'services-section')}>
              Servicios
            </a>
          </li>
          <li className="navbar-item">
            <a href="#faqs" className="navbar-link" onClick={(e) => handleLinkClick(e, 'faq-section')}>
              Preguntas
            </a>
          </li>
          <li className="navbar-item">
            <a href="#contacto" className="navbar-link btn-nav-contact" onClick={(e) => handleLinkClick(e, 'contact-section')}>
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;