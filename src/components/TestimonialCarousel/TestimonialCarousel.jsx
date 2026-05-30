import React, { useState } from 'react';
import './TestimonialCarousel.css';

const TestimonialCarousel = () => {
  // Estado para controlar cuál testimonio se está mostrando
  const [currentIndex, setCurrentIndex] = useState(0);

  // Listado de testimonios ficticios de emprendedores de Sercotec
  const testimonials = [
    {
      id: 1,
      text: "Gracias a las asesorías de Sercotec, logramos digitalizar nuestro inventario y aumentar las ventas en un 40%. El apoyo fue clave.",
      author: "María José Fuentes",
      business: "Cafetería 'El Encuentro'"
    },
    {
      id: 2,
      text: "El taller de Marketing Digital me abrió los ojos. Pasamos de vender solo localmente a despachar a todo Santiago mediante redes sociales.",
      author: "Carlos Andrés Silva",
      business: "Artesanías Raíces"
    },
    {
      id: 3,
      text: "El acompañamiento es real y constante. Sentirse respaldado como pequeña empresaria te da la confianza para seguir creciendo.",
      author: "Ana María Castro",
      business: "Confecciones AM"
    }
  ];

  // Funciones para avanzar y retroceder
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    // Atributos de accesibilidad: definir el rol como carrusel y dotar una etiqueta descriptiva
    <section 
      className="carousel-container" 
      aria-roledescription="carousel" 
      aria-label="Testimonios de emprendedores exitosos"
    >
      <h2 className="carousel-title">Lo que dicen nuestros emprendedores</h2>

      {/* aria-live="polite" le avisa al lector de pantalla cuando el contenido interno cambia, de forma suave */}
      <div className="carousel-view" aria-live="polite">
        <div className="testimonial-card">
          <blockquote className="testimonial-text">
            "{testimonials[currentIndex].text}"
          </blockquote>
          <p className="testimonial-author">
            <strong>{testimonials[currentIndex].author}</strong>
          </p>
          <p className="testimonial-business">
            {testimonials[currentIndex].business}
          </p>
        </div>
      </div>

      {/* Controles del carrusel con etiquetas descriptivas para accesibilidad */}
      <div className="carousel-controls">
        <button 
          onClick={handlePrev} 
          className="carousel-btn prev"
          aria-label="Ver testimonio anterior"
        >
          &#10094; Anterior
        </button>
        
        {/* Indicadores visuales de posición (los puntitos) */}
        <div className="carousel-dots" role="group" aria-label="Navegación de diapositivas">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
              aria-selected={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>

        <button 
          onClick={handleNext} 
          className="carousel-btn next"
          aria-label="Ver siguiente testimonio"
        >
          Siguiente &#10095;
        </button>
      </div>
    </section>
  );
};

export default TestimonialCarousel;