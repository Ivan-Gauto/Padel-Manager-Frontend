# Padel Manager - Frontend (UI)

Bienvenido al repositorio central del Frontend para **Padel Manager**. Esta es la interfaz de usuario interactiva diseñada para optimizar y modernizar la gestión de torneos de pádel en el NEA, conectándose directamente con nuestra API para reemplazar los procesos manuales.

## Estructura del Proyecto

El frontend está organizado de manera modular para asegurar la escalabilidad y facilitar el trabajo en paralelo del equipo de desarrollo:

* **Components:** Componentes de interfaz aislados y reutilizables.
* **Pages:** Las pantallas principales de la aplicación.
* **Services:** Archivos dedicados exclusivamente a la comunicación con el Backend.
* **Hooks / Context:** Lógica de estado global y funciones personalizadas de React.

## Stack Tecnológico

* **Librería Core:** React
* **Entorno de Construcción:** Vite (con variante SWC)
* **Lenguaje:** TypeScript
* **Estandarización:** ESLint + Prettier
* **IDE:** Visual Studio Code


## Reglas de Trabajo (Git Workflow)

Para mantener el código limpio y organizado en el **Team Versori 2**, utilizaremos el siguiente flujo:

* **Ramas Principales:**
  * `main`: Contiene el código estable y listo para producción.
  * `development`: Rama principal de integración para nuevas funciones.
* **Ramas de Tarea:**
  * Para cada nueva funcionalidad o arreglo, crea una rama local partiendo desde `development`: `feature/nombre-de-la-tarea`.
* **Commits:** Usa mensajes descriptivos en inglés.

---
*Desarrollado por Team Versori 2.*
