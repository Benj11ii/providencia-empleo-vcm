import React, { useState, useEffect } from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consume API interna de forma dinámica
  useEffect(() => {
    fetch('/api/about.json')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar la sección Nosotros');
        return res.json();
      })
      .then((data) => {
        setAboutData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Cargando información corporativa...</p>;
  if (!aboutData) return null;

  return (
    <section className="about-section" aria-label="Acerca de Nosotros">
      <div className="about-content">
        <h2 className="about-title">{aboutData.title}</h2>
        <p className="about-description">{aboutData.description}</p>
        
        <div className="about-details">
          <div className="detail-item">
            <span className="detail-icon" aria-hidden="true">📍</span>
            <p className="detail-text">
              <strong>Dirección:</strong> {aboutData.address}
            </p>
          </div>
          <div className="detail-item">
            <span className="detail-icon" aria-hidden="true">✉️</span>
            <p className="detail-text">
              <strong>Contacto:</strong> {aboutData.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;