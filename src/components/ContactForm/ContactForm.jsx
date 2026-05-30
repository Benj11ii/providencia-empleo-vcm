import React, { useState, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = ({ selectedService, setSelectedService }) => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    website: '' // <--- Campo HONEYPOT (trampa invisible para robots)
  });

  // Estado para capturar errores del cliente
  const [errors, setErrors] = useState({});
  // Estado para la confirmación de envío exitoso
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Se sincroniza el servicio seleccionado desde las tarjetas del Punto 1
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpiar el error del campo modificado en tiempo real (usabilidad)
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validaciones del cliente (Punto 10)
  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || formData.name.length < 3) {
      tempErrors.name = 'Por favor, ingresa tu nombre completo (mínimo 3 caracteres).';
    }
    if (!formData.email) {
      tempErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Por favor, ingresa un formato de correo electrónico válido.';
    }
    if (!formData.service) {
      tempErrors.service = 'Debes seleccionar un servicio de interés.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      tempErrors.message = 'Por favor, detalla tu mensaje (mínimo 10 caracteres).';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Retorna true si no hay errores
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. FILTRADO ANTI-ROBOTS (Honeypot - Punto 10)
    if (formData.website) {
      console.warn("Intento de spam detectado y bloqueado por Honeypot.");
      // Pretendemos que se envió correctamente para que el robot crea que tuvo éxito,
      // pero no procesamos ni enviamos ningún dato.
      setIsSubmitted(true);
      return;
    }

    // 2. VALIDACIÓN DEL CLIENTE (Punto 10)
    if (validateForm()) {
      console.log("Formulario enviado con éxito de manera segura:", formData);
      setIsSubmitted(true);
      
      // Limpiar los campos del formulario
      setFormData({ name: '', email: '', service: '', message: '', website: '' });
      if (setSelectedService) {
        setSelectedService(''); // Limpiar la selección global
      }
    }
  };

  return (
    <div className="contact-form-container" id="contact-section">
      <h2>Solicitud de Acompañamiento Sercotec</h2>
      <p className="contact-subtitle">
        Complete el formulario y un asesor se pondrá en contacto para programar su primera sesión.
      </p>

      {isSubmitted ? (
        <div className="success-message" role="alert">
          <h3>¡Solicitud Recibida Exitosamente!</h3>
          <p>Sus datos han sido registrados de forma segura y encriptada. Un ejecutivo del Centro de Negocios Santiago le contactará en un plazo de 24 horas hábiles.</p>
          <button onClick={() => setIsSubmitted(false)} className="btn-return">Enviar otra solicitud</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          
          {/* CAMPO HONEYPOT TOTALMENTE INVISIBLE (Protección contra robots - Punto 10) [3] */}
          <div className="honeypot-field" aria-hidden="true">
            <label htmlFor="website">Si eres un humano, no escribas nada aquí:</label>
            <input 
              type="text" 
              id="website" 
              name="website" 
              value={formData.website} 
              onChange={handleChange} 
              tabIndex="-1" 
              autoComplete="off" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Nombre Completo *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="Ej. Juan Pérez González"
            />
            {errors.name && <span className="error-text-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="ejemplo@correo.cl"
            />
            {errors.email && <span className="error-text-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="service">Servicio Solicitado *</label>
            <select 
              id="service" 
              name="service" 
              value={formData.service} 
              onChange={handleChange}
              className={errors.service ? 'input-error' : ''}
            >
              <option value="">-- Seleccione el servicio --</option>
              <option value="Asesoría Técnica Individual">Asesoría Técnica Individual</option>
              <option value="Capacitación Empresarial">Capacitación Empresarial</option>
              <option value="Vinculación y Networking">Vinculación y Networking</option>
            </select>
            {errors.service && <span className="error-text-msg">{errors.service}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Cuéntenos sobre su negocio / idea *</label>
            <textarea 
              id="message" 
              name="message" 
              rows="4"
              value={formData.message} 
              onChange={handleChange}
              className={errors.message ? 'input-error' : ''}
              placeholder="Detalle brevemente a qué se dedica su emprendimiento..."
            />
            {errors.message && <span className="error-text-msg">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-btn">Enviar Formulario de Forma Segura</button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;