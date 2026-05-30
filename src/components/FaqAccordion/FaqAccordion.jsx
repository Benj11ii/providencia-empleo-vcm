import React, { useState, useEffect } from 'react';
import './FaqAccordion.css';

const FaqAccordion = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Guarda el índice de la pregunta abierta
  const [loading, setLoading] = useState(true);

  // Consumir API interna de forma dinámica para cumplir rúbrica
  useEffect(() => {
    fetch('/api/faqs.json')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar las preguntas frecuentes');
        return res.json();
      })
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleAccordion = (index) => {
    // Si hacemos clic en la pregunta que ya está abierta, la cerramos (null). Si no, abrimos la nueva
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) return <p className="loading-text">Cargando preguntas frecuentes...</p>;

  return (
    <section className="faq-section" aria-label="Sección de Preguntas Frecuentes">
      <h2 className="faq-title">Preguntas Frecuentes</h2>
      <p className="faq-subtitle">Resolvemos tus dudas principales sobre el acompañamiento del Centro de Negocios.</p>
      
      <div className="accordion">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div key={faq.id} className={`accordion-item ${isOpen ? 'active' : ''}`}>
              <button 
                className="accordion-header" 
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen ? "true" : "false"}
                aria-controls={`faq-content-${faq.id}`}
              >
                <span className="faq-question">{faq.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div 
                id={`faq-content-${faq.id}`}
                className="accordion-body"
                role="region"
                aria-hidden={!isOpen}
                style={{ display: isOpen ? 'block' : 'none' }}
              >
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqAccordion;