import React, { useState } from 'react';
import './App.css';
import ServiceCard from './components/ServiceCard/ServiceCard'; // Importamos el componente
import TestimonialCarousel from './components/TestimonialCarousel/TestimonialCarousel'; // Se importa el carrusel

function App() {
  // Este estado guarda temporalmente el servicio que el usuario seleccione al hacerr clic
  const [selectedService, setSelectedService] = useState('');

  // Se simula una lista de servicios reales del Centro de Negocios de SERCOTEC
  const servicesList = [
    {
      id: 1,
      title: "Asesoría Técnica Individual",
      description: "Acompañamiento personalizado y confidencial para diagnosticar y mejorar la gestión de tu micro o pequeña empresa.",
      // Se usa imagen de prueba de internet para ver cómo luce
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      title: "Capacitación Empresarial",
      description: "Talleres prácticos sobre marketing digital, finanzas, contabilidad y uso de herramientas digitales para emprendedores.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400"
    }
  ];

  // Función de prueba que se ejecuta cuando el usuario hace clic en "Contáctanos"
  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
    // Mostrar una alerta para comprobar que la tarjeta le envía el dato correcto al padre
    alert(`¡Perfecto! Has seleccionado: "${serviceTitle}". En los siguientes pasos, este valor pre-llenará el formulario automáticamente.`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Centro de Negocios Santiago de SERCOTEC</h1>
        <p>Apoyo integral para el crecimiento de tu negocio</p>
      </header>

      <main className="app-main">
        <section className="services-section">
          <h2>Nuestros Servicios Destacados</h2>

          {/* Aquí se dibuja las tarjetas dinámicamente usando un ciclo .map */}
          <div className="services-grid">
            {servicesList.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                onSelectService={handleSelectService} // Se pasa función de prueba
              />
            ))}
          </div>
        </section>

        {/* Pequeña sección informativa sobre lo seleccionado */}
        {selectedService && (
          <div className="selection-indicator">
            <p>Servicio seleccionado actualmente: <strong>{selectedService}</strong></p>
          </div>
        )}
        {/* Punto 2: Carrusel de Testimonios */}
        <TestimonialCarousel />
      </main>
    </div>
  );
}

export default App;