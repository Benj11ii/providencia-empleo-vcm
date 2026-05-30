# Plataforma de Búsqueda Inversa — Municipalidad de Providencia

**Proyecto de Vinculación con el Medio (VcM)**  
**Asignatura:** Desarrollo Frontend (IF200IINF) — Unidad 3  
**Instituto Profesional:** San Sebastián

Solución tecnológica frontend construida en React + Vite, conectada de forma dinámica a un CMS WordPress en modo headless. Diseñada para el Departamento de Empleo de la Municipalidad de Providencia con el objetivo de facilitar el modelo de **búsqueda inversa de talento local**: en lugar de que los candidatos busquen empleos, las empresas acceden a los perfiles registrados y contactan directamente a los postulantes.

---

## Requisitos previos

- **Node.js** v18 o superior
- **XAMPP** con los módulos Apache y MySQL activos

---

## Instalación y ejecución

### 1. Frontend (React + Vite)

```bash
# Desde la raíz del proyecto
npm install
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:5173/`.

### 2. Backend (WordPress headless)

1. Descarga WordPress y descomprímelo en:
   ```
   D:\xampp\htdocs\wordpress\
   ```
2. Abre el **XAMPP Control Panel** y activa los módulos **Apache** y **MySQL**.
3. Ve a `http://localhost/phpmyadmin/` y crea una base de datos vacía llamada `wordpress`.
4. Completa el asistente de instalación en `http://localhost/wordpress/`:
   - Usuario: `root`
   - Contraseña: *(dejar vacía)*
5. Desde el panel de administración, crea al menos **3 entradas (Posts)** con título, descripción e **Imagen Destacada** asignada.

React consumirá esas entradas de forma dinámica a través del endpoint REST nativo:

```
http://localhost/wordpress/wp-json/wp/v2/posts?_embed
```

---

## Estructura del proyecto

```
sercotec-landing/
├── public/
│   └── api/
│       ├── about.json
│       └── faqs.json
├── src/
│   ├── assets/img/
│   ├── components/
│   │   ├── AboutSection/
│   │   ├── ContactForm/
│   │   ├── FaqAccordion/
│   │   ├── Navbar/
│   │   ├── ServiceCard/
│   │   └── TestimonialCarousel/
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── GUIA_BUENAS_PRACTICAS.md
├── RETROSPECTIVA.md
└── package.json
```

---

## Guía de componentes

### `Navbar`

Barra de navegación fija con menú responsivo (hamburguesa en móvil). Gestiona internamente el estado de apertura del menú y ejecuta scroll suave hacia las secciones de la página mediante `scrollIntoView`.

```jsx
// Se incluye una sola vez en App.jsx, sobre el resto del contenido
<Navbar />
```

Secciones a las que navega: `#nosotros-section`, `#services-section`, `#faq-section`, `#contact-section`.

---

### `AboutSection`

Sección corporativa que carga su contenido de forma dinámica desde `/api/about.json`. No recibe props; gestiona su propio estado interno.

```jsx
<div id="nosotros-section">
  <AboutSection />
</div>
```

---

### `ServiceCard`

Tarjeta reutilizable que representa cada programa de empleo disponible. Recibe sus datos como props desde `App.jsx`, donde son obtenidos de la API de WordPress.

| Prop | Tipo | Descripción |
|---|---|---|
| `title` | `string` | Nombre del servicio |
| `description` | `string` | Descripción limpia (sin etiquetas HTML) |
| `image` | `string` | URL de la imagen destacada de WordPress |
| `onSelectService` | `function` | Callback de *lifting state up*: pre-llena el campo de servicio en `ContactForm` |

```jsx
<ServiceCard
  title="Plataforma de Búsqueda Inversa"
  description="Conectamos el talento local con empresas inclusivas."
  image="http://localhost/wordpress/wp-content/uploads/imagen.jpg"
  onSelectService={handleSelectService}
/>
```

---

### `ContactForm`

Formulario de registro de talento con validación en tiempo real, protección honeypot anti-spam y sincronización de estado con `ServiceCard`.

| Prop | Tipo | Descripción |
|---|---|---|
| `selectedService` | `string` | Servicio pre-seleccionado recibido desde `App.jsx` |
| `setSelectedService` | `function` | Setter para limpiar la selección tras el envío |

```jsx
<ContactForm
  selectedService={selectedService}
  setSelectedService={setSelectedService}
/>
```

Campos del formulario: nombre completo, correo electrónico, servicio solicitado (select), mensaje libre y campo honeypot invisible.

---

### `FaqAccordion`

Acordeón interactivo que carga las preguntas frecuentes desde `/api/faqs.json`. Administra un estado `activeIndex` para expandir/colapsar una sección a la vez. No recibe props.

```jsx
<div id="faq-section">
  <FaqAccordion />
</div>
```

---

### `TestimonialCarousel`

Carrusel de testimonios con rotación automática. Implementa accesibilidad WCAG 2.1 mediante `aria-live="polite"` para que los lectores de pantalla anuncien los cambios de contenido. No recibe props.

```jsx
<TestimonialCarousel />
```

---

## Flujo de datos principal

```
WordPress REST API
        │
        ▼
   App.jsx (fetch + map)
        │
        ├──▶ ServiceCard[]  ──(onSelectService)──▶  App.jsx state
        │                                                  │
        └──────────────────────────────────────────▶ ContactForm
```

`App.jsx` centraliza la petición a WordPress, mapea la respuesta al formato que espera `ServiceCard`, y gestiona el estado `selectedService` que conecta la selección de una tarjeta con el pre-llenado del formulario de contacto (*lifting state up*).

---

## Entrega

Para generar el archivo entregable, eliminar primero la carpeta `node_modules` (el evaluador ejecutará `npm install` por su cuenta), luego comprimir la carpeta del proyecto:

```
Eval_U3A_NOMBRE_DEL_EQUIPO.zip
```
