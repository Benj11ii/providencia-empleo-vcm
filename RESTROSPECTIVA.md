# Acta de Sesión de Retrospectiva Ágil (Punto 11)
**Proyecto:** Plataforma de Búsqueda Inversa - Municipalidad de Providencia
**Fecha:** 30 de Mayo de 2026

Esta sesión de retrospectiva se organizó con el objetivo de evaluar el desempeño del equipo de desarrollo, identificar fortalezas y áreas de mejora en el uso del framework React y definir un plan de acción para futuras iteraciones del desarrollo.

---

### 1. ¿Qué salió bien? (Fortalezas)
*   **Uso eficiente del Framework React:** La modularización en componentes reutilizables (`ServiceCard`, `TestimonialCarousel`, `ContactForm`, `FaqAccordion`, `AboutSection`) facilitó enormemente el desarrollo aislado y la consistencia visual.
*   **Integración Headless CMS Exitosa:** El uso de WordPress como un backend REST API permitió que el contenido de la landing page sea 100% autoadministrable de forma dinámica, eliminando el código estático y código en duro.
*   **Metodología Git Organizada:** Trabajar con ramas dedicadas por funcionalidad (*feature branches*) mantuvo la rama principal limpia y libre de conflictos de código durante el desarrollo.

### 2. ¿Qué se puede mejorar? (Áreas de Oportunidad)
*   **Manejo inicial de configuraciones locales:** La instalación inicial de base de datos MySQL y servidores Apache en XAMPP a veces se vuelve demorosa y requiere permisos especiales que pueden retrasar el desarrollo en las fases iniciales.
*   **Optimización del tiempo de carga:** En la próxima iteración deberíamos implementar la carga diferida de imágenes (*lazy loading*) nativa en React para mejorar el rendimiento del primer render.

### 3. Plan de Acción para la Próxima Iteración
*   **Acción 1:** Implementar un sistema de caché persistente en el frontend (`localStorage` o *Service Workers*) para disminuir el número de consultas HTTP repetitivas a la API de WordPress y optimizar el rendimiento.
*   **Acción 2:** Diseñar pruebas unitarias automatizadas (con Jest o React Testing Library) para validar la robustez de los componentes visuales antes de integrarlos en producción.