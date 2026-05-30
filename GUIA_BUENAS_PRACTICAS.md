# Guía de Buenas Prácticas — Desarrollo Frontend

**Proyecto:** Plataforma de Búsqueda Inversa — Municipalidad de Providencia  
**Asignatura:** Desarrollo Frontend (IF200IINF) — Proyecto VcM  
**Instituto Profesional:** San Sebastián

Este documento detalla las 10 mejores prácticas de desarrollo frontend aplicadas durante la construcción del proyecto, estructuradas de acuerdo con la pauta de evaluación.

---

## 1. Nomenclatura consistente y semántica (PascalCase y camelCase)

**Acción específica:** Usar *PascalCase* exclusivamente para nombrar archivos y funciones de componentes React, y *camelCase* para variables y funciones lógicas de JavaScript.

**Herramienta:** Visual Studio Code, ESLint.

**Técnica:** Mantener coincidencia estricta entre el nombre del archivo, la función exportada y su importación en otros archivos.

**Resultado esperado:** Facilidad de lectura, consistencia en el proyecto y prevención de colisiones de nombres en el árbol de dependencias.

```jsx
// Archivo: ServiceCard.jsx  →  nombre en PascalCase
const ServiceCard = ({ title }) => { ... }

// Función lógica en App.jsx  →  nombre en camelCase
const handleSelectService = (serviceTitle) => { ... }
```

---

## 2. Estructura modular de carpetas (Self-Contained Components)

**Acción específica:** Agrupar el archivo lógico `.jsx` y su hoja de estilos `.css` dentro de una subcarpeta dedicada por componente.

**Herramienta:** Explorador de archivos del entorno de desarrollo.

**Técnica:** Importación local relativa de la hoja de estilos dentro del componente para aislar el diseño y evitar efectos globales no deseados.

**Resultado esperado:** Alta modularidad, desacoplamiento del código y facilidad para reutilizar componentes en otros proyectos sin arrastrar dependencias rotas.

```
src/components/TestimonialCarousel/
├── TestimonialCarousel.jsx
└── TestimonialCarousel.css
```

---

## 3. Consumo dinámico de endpoints (evitar código en duro)

**Acción específica:** Cargar todo el contenido de la interfaz (títulos, descripciones, imágenes) de forma dinámica desde APIs y bases de datos, en lugar de declararlo fijo en el código de la UI.

**Herramienta:** API REST nativa de WordPress, XAMPP, MySQL.

**Técnica:** Uso de la función nativa `fetch()` conectada a endpoints asíncronos en React, dentro del hook `useEffect` para ejecutar la petición al montar el componente.

**Resultado esperado:** Separación de responsabilidades entre el contenido (CMS) y el diseño (React), lo que permite que personal no técnico administre los datos de la página sin tocar código.

```javascript
useEffect(() => {
  fetch('http://localhost/wordpress/wp-json/wp/v2/posts?_embed')
    .then((response) => response.json())
    .then((data) => setServicesList(data));
}, []);
```

---

## 4. Control de estados de carga y error (robustez)

**Acción específica:** Implementar estados explícitos de carga y captura de errores en la interfaz para cada petición asíncrona.

**Herramienta:** Hook `useState` de React, bloques `try/catch` y cadenas `.catch()` en promesas.

**Técnica:** Renderizado condicional para mostrar indicadores de carga o mensajes de error descriptivos cuando el servidor WordPress no responde.

**Resultado esperado:** Prevención de pantallas en blanco, robustez ante fallas de red y retroalimentación clara al usuario durante los estados de espera.

```jsx
{loading && <p className="loading-text">Cargando servicios dinámicos...</p>}
{error   && <p className="error-text">Error: {error}</p>}

{!loading && !error && (
  <div className="services-grid">
    {servicesList.map((service) => (
      <ServiceCard key={service.id} {...service} onSelectService={handleSelectService} />
    ))}
  </div>
)}
```

---

## 5. Adaptación y mapeo de datos de API (Data Mapping)

**Acción específica:** Crear una función de transformación intermedia inmediatamente después de recibir la respuesta JSON de la API, para adaptar su estructura al formato que esperan los componentes de React.

**Herramienta:** Método `.map()` de arrays nativos de JavaScript, encadenamiento opcional (`?.`).

**Técnica:** Traducir las propiedades anidadas de la API de WordPress (imágenes dentro de `_embedded`, HTML en `content.rendered`) a un objeto local simple y limpio, usando una expresión regular para extraer el texto plano.

**Resultado esperado:** Reducción del acoplamiento entre el backend y el frontend; cambios en la estructura de la API no rompen los componentes de la interfaz.

```javascript
const mappedServices = data.map((post) => {
  const cleanDescription = post.content.rendered.replace(/<[^>]*>/g, '').trim();
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
    || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40';

  return {
    id:          post.id,
    title:       post.title.rendered,
    description: cleanDescription,
    image:       imageUrl,
  };
});
```

---

## 6. Accesibilidad semántica y universal (WCAG 2.1)

**Acción específica:** Usar elementos HTML semánticos nativos y atributos ARIA para que todos los elementos interactivos sean legibles por tecnologías de asistencia.

**Herramienta:** Atributos `aria-live`, `aria-roledescription`, `aria-label`, `aria-expanded`; etiquetas `<nav>`, `<section>`, `<blockquote>`.

**Técnica:** Aplicar `aria-live="polite"` en contenedores dinámicos para que los lectores de pantalla anuncien los cambios de contenido sin interrumpir al usuario. Usar `aria-expanded` en el botón hamburguesa para comunicar el estado del menú móvil.

**Resultado esperado:** Inclusión digital, cumplimiento de normativas de accesibilidad internacionales y mejora del posicionamiento SEO.

```jsx
{/* Navbar: estado del menú hamburguesa comunicado a lectores de pantalla */}
<button aria-label="Abrir menú de navegación" aria-expanded={isOpen ? "true" : "false"}>
  ...
</button>

{/* TestimonialCarousel: anuncio automático de cambios de slide */}
<section aria-roledescription="carousel" aria-label="Testimonios">
  <div className="carousel-view" aria-live="polite">
    <blockquote>"{text}"</blockquote>
  </div>
</section>
```

---

## 7. Seguridad en el cliente (validación de formularios)

**Acción específica:** Validar en tiempo real y al enviar el formulario que todos los campos cumplan el formato esperado antes de procesar los datos.

**Herramienta:** Expresiones regulares (Regex) nativas de JavaScript, hook `useState` para el estado de errores.

**Técnica:** Interceptar el evento de envío con `e.preventDefault()`, evaluar cada campo con su regla de validación correspondiente y almacenar los mensajes de error en un estado dedicado para mostrarlos visualmente junto a cada campo.

**Resultado esperado:** Prevención del envío de datos malformados al servidor y retroalimentación inmediata al usuario, mejorando la usabilidad del formulario.

```javascript
const validateForm = () => {
  const tempErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.name.trim() || formData.name.length < 3) {
    tempErrors.name = 'Por favor, ingresa tu nombre completo (mínimo 3 caracteres).';
  }
  if (!emailRegex.test(formData.email)) {
    tempErrors.email = 'Por favor, ingresa un formato de correo electrónico válido.';
  }
  if (!formData.message.trim() || formData.message.length < 10) {
    tempErrors.message = 'Por favor, detalla tu mensaje (mínimo 10 caracteres).';
  }

  setErrors(tempErrors);
  return Object.keys(tempErrors).length === 0;
};
```

---

## 8. Protección anti-robots invisible (método Honeypot)

**Acción específica:** Incluir un campo trampa invisible en el formulario para detectar y descartar envíos automatizados por scripts de spam.

**Herramienta:** Atributos `aria-hidden="true"`, `tabIndex="-1"`, `autoComplete="off"` y CSS (`display: none`).

**Técnica:** El campo `website` es invisible para el usuario humano (oculto por CSS y excluido de la navegación por teclado). Si al enviar el formulario ese campo contiene algún valor, se descarta el envío de forma silenciosa; el robot recibe una respuesta de éxito falsa para evitar reintentos.

**Resultado esperado:** Eliminación práctica del spam automatizado sin degradar la experiencia del usuario con CAPTCHAs complejos.

```jsx
{/* JSX: campo invisible para humanos, trampa para robots */}
<div className="honeypot-field" aria-hidden="true">
  <label htmlFor="website">No completar este campo:</label>
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
```

```css
/* CSS: oculto visualmente y para tecnologías de asistencia */
.honeypot-field { display: none !important; }
```

```javascript
// Lógica en handleSubmit: si el campo tiene valor, es un robot
if (formData.website) {
  console.warn("Intento de spam detectado y bloqueado.");
  setIsSubmitted(true); // Respuesta falsa de éxito
  return;
}
```

---

## 9. Navegación fluida con desplazamiento suave (Smooth Scroll)

**Acción específica:** Implementar una barra de navegación fija que desplace al usuario de forma fluida hacia secciones específicas de la página sin recargar el documento.

**Herramienta:** Método nativo `Element.scrollIntoView()` de JavaScript, propiedad CSS `scroll-margin-top`.

**Técnica:** Al hacer clic en un enlace del menú, se llama a `scrollIntoView({ behavior: 'smooth' })` sobre el elemento objetivo. La propiedad `scroll-margin-top` en cada sección compensa la altura de la barra de navegación fija para que el título no quede oculto detrás de ella.

**Resultado esperado:** Navegación intuitiva y fluida, sin saltos bruscos, con el contenido siempre visible bajo la barra fija.

```javascript
// Navbar.jsx — función de navegación suave
const handleLinkClick = (e, targetId) => {
  e.preventDefault();
  setIsOpen(false); // Cierra el menú móvil al navegar
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
};
```

```css
/* Compensación de la altura del navbar fijo (70px + margen) */
#nosotros-section,
#services-section,
#faq-section,
#contact-section {
  scroll-margin-top: 90px;
}
```

---

## 10. Control de versiones semántico (Conventional Commits)

**Acción específica:** Registrar cada cambio con mensajes de confirmación claros y prefijados según el estándar internacional de *Conventional Commits*.

**Herramienta:** Git, GitHub.

**Técnica:** Usar prefijos estandarizados (`feat:`, `fix:`, `chore:`, `docs:`) para categorizar cada commit, y desarrollar cada funcionalidad en ramas separadas antes de integrarlas en `master` mediante merge.

**Resultado esperado:** Historial de desarrollo profesional, trazabilidad completa del código y facilitación del trabajo colaborativo en equipos multidisciplinarios.

```bash
# Crear rama para una nueva funcionalidad
git checkout -b feature/tarjeta-servicio

# Registrar el trabajo realizado con mensaje semántico
git add .
git commit -m "feat: implementar componente ServiceCard con props y estilos"

# Integrar la rama en master
git switch master
git merge feature/tarjeta-servicio

# Ejemplo de otros prefijos usados en el proyecto
git commit -m "chore: configuración inicial del proyecto con Vite"
git commit -m "fix: corregir validación de email en ContactForm"
git commit -m "docs: agregar README y guía de buenas prácticas"
```
