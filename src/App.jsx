import React, { useState, useEffect } from 'react'; // Importar useEffect para controlar la carga de datos
import './App.css';
import ServiceCard from './components/ServiceCard/ServiceCard';
import TestimonialCarousel from './components/TestimonialCarousel/TestimonialCarousel';

function App() {
  const [selectedService, setSelectedService] = useState('');
  
  // 1. Estado para almacenar los servicios que vendrán de la API
  const [servicesList, setServicesList] = useState([]);
  
  // 2. Estados para el control de carga y posibles errores
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. El Hook useEffect ejecuta la petición de forma automática al cargar la página
  useEffect(() => {
    // Simular petición HTTP GET a endpoint de prueba
    fetch('/api/services.json')
      .then((response) => {
        // Si la respuesta no es exitosa (ej. error 404), lanzar un error
        if (!response.ok) {
          throw new Error('No se pudieron cargar los servicios de la API.');
        }
        return response.json(); // Convertir la respuesta a formato JSON
      })
      .then((data) => {
        setServicesList(data); // Guardar los datos en estado
        setLoading(false);     // Indicar que la carga terminó
      })
      .catch((err) => {
        setError(err.message); // Si hay un error de red,se guarda
        setLoading(false);
      });
  }, []); // El arreglo vacío [] asegura que la petición se haga una sola vez al montar el componente

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
    alert(`Has seleccionado: "${serviceTitle}".`);
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

        {selectedService && (
          <div className="selection-indicator">
            <p>Servicio seleccionado actualmente: <strong>{selectedService}</strong></p>
          </div>
        )}

        <TestimonialCarousel />
      </main>
    </div>
  );
}

export default App;