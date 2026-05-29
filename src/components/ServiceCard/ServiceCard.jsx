import React from 'react';
import './ServiceCard.css';

// Las "props" permite que este único componente funcional sirva para muchos servicios
const ServiceCard = ({ image, title, description, onSelectService }) => {
  
  const handleContactClick = () => {
    // Al hacer clic, enviamos el título del servicio hacia el componente padre
    onSelectService(title);
    
    // Scroll suave hacia la sección del formulario de contacto
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="service-card">
      {/* Buena práctica de accesibilidad usar 'alt' como punto descriptivo */}
      <img src={image} alt={`Imagen ilustrativa de ${title}`} className="service-card-image" />
      <div className="service-card-content">
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-description">{description}</p>
        <button 
          className="service-card-button" 
          onClick={handleContactClick}
          aria-label={`Contactar por el servicio de ${title}`}
        >
          Contáctanos
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;