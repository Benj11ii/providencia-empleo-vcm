import React, { useState, useEffect } from 'react'; // Importar useEffect para controlar la carga de datos
import './App.css';
import ServiceCard from './components/ServiceCard/ServiceCard';
import TestimonialCarousel from './components/TestimonialCarousel/TestimonialCarousel';
import ContactForm from './components/ContactForm/ContactForm';
import FaqAccordion from './components/FaqAccordion/FaqAccordion';
import AboutSection from './components/AboutSection/AboutSection';

function App() {
  const [selectedService, setSelectedService] = useState('');

  // 1. Estado para almacenar los servicios que vendrán de la API
  const [servicesList, setServicesList] = useState([]);

  // 2. Estados para el control de carga y posibles errores
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. El Hook useEffect ejecuta la petición de forma automática al cargar la página
  useEffect(() => {
    // Apuntamos a la API real de su WordPress local con el parámetro de unión ?_embed [3]
    fetch('http://localhost/wordpress/wp-json/wp/v2/posts?_embed')
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudieron cargar los servicios desde WordPress.');
        }
        return response.json();
      })
      .then((data) => {
        // Mapear los datos de WordPress para adaptarlo a la forma que espera en tarjetas
        const mappedServices = data.map((post) => {

          // 1. Extraer la URL de la imagen destacada de forma segura
          let imageUrl = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400'; // Imagen por defecto
          if (
            post._embedded &&
            post._embedded['wp:featuredmedia'] &&
            post._embedded['wp:featuredmedia'][0]
          ) {
            imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
          }

          // 2. Limpiar las etiquetas HTML <p> de la descripción con una expresión regular sencilla
          const cleanDescription = post.content.rendered.replace(/<[^>]*>/g, '').trim();

          // Retornar un objeto idéntico al que esperaba componente
          return {
            id: post.id,
            title: post.title.rendered, // Título dinámico de WordPress
            description: cleanDescription, // Descripción limpia
            image: imageUrl // URL de la imagen destacada
          };
        });

        setServicesList(mappedServices); // Guardamos la lista mapeada en el estado
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

    const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };


  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Centro de Negocios Santiago de SERCOTEC</h1>
        <p>Apoyo integral para el crecimiento de su negocio</p>
      </header>

      <main className="app-main">
        {/* Punto 9: Sección Nosotros Dinámica */}
        <AboutSection />
        <section className="services-section">
          <h2>Nuestros Servicios Destacados</h2>

          {/* Control de estados de la API en la interfaz de usuario */}
          {loading && <p className="loading-text">Cargando servicios dinámicos...</p>}
          {error && <p className="error-text">Error: {error}</p>}

          {/* Renderizado de las tarjetas solo si la carga fue exitosa */}
          {!loading && !error && (
            <div className="services-grid">
              {servicesList.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  onSelectService={handleSelectService}
                />
              ))}
            </div>
          )}
        </section>
          {/* Preguntas Frecuentes Dinámicas */}
        <FaqAccordion />
        <ContactForm
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />

        <TestimonialCarousel />
      </main>
    </div>
  );
}

export default App;