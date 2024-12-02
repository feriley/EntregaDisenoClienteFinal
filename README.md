📄 Proyecto ClienteDiseño - Portfolio Web Autor: Fernando Iglesias Leyva Asignatura: Diseño y Desarrollo Web en el Cliente Ciclo Formativo: Desarrollo de Aplicaciones Web (DAW)

📖 Índice Introducción Características Principales Tecnologías Utilizadas Guía de Instalación Guía de Uso Estructura de la Consola de Administración Conclusión Contribuciones y Agradecimientos Licencia Contacto

📜 Introducción Este proyecto es una aplicación web para la gestión de un portafolio personal. Ha sido desarrollado utilizando Astro como framework principal y se conecta a una API REST para consumir información dinámica de proyectos, tecnologías y más.

El objetivo del proyecto es demostrar el uso de herramientas modernas para crear aplicaciones web dinámicas y conectadas a APIs. Además, se incluye una consola de administración con autenticación básica y manejo de sesiones.

🌟 Características Principales 🎯 Funcionalidades Generales Secciones del Portafolio: About Me: Presentación personal. Education: Información académica. Work Experience: Experiencia laboral. Projects: Muestra proyectos con datos provenientes de una API. Skills: Tecnologías dominadas, separadas por áreas. References: Referencias personales. Contact Me: Formulario con validación de campos.

🔗 Integración con la API REST Proyectos Dinámicos: Muestra proyectos con paginación, filtro por tecnología y buscador. Operaciones en la Consola: Gestión de proyectos, tecnologías y personas desde una interfaz administrativa.

🛡️ Autenticación en Consola de Administración Login: Verifica credenciales (admin y Abcd1234). Sesiones Temporales: Manejo de sesiones usando localStorage con expiración de 15 minutos.

🛠️ Tecnologías Utilizadas Framework Principal: Astro Lenguaje: TypeScript Framework de Estilo: TailwindCSS Conexión Backend: API REST desarrollada en Spring Boot Autenticación: LocalStorage y manejo de tokens simulados Construcción Dinámica: WebComponents en la consola de administración

📥 Guía de Instalación Clonar el Repositorio bash Copiar código git clone <URL_DEL_REPOSITORIO> cd ClienteDiseño Instalar Dependencias bash Copiar código npm install Ejecutar en Desarrollo bash Copiar código npm run dev Construir para Producción bash Copiar código npm run build.

🚀 Guía de Uso

🔧 Variables y Configuración Conectar con la API REST: Asegúrate de que la API esté en ejecución localmente en http://localhost:8080. Endpoint Principal: Los proyectos se cargan desde /api/v1/projects.

🔗 Navegación Página de Portafolio: Muestra secciones con datos consumidos de JSON y la API REST. Consola de Administración: Login en /Login con las credenciales indicadas. Redirección a /Admin para gestionar recursos.

📊 Estructura de la Consola de Administración Inicio de Sesión Validación de Credenciales: Usuario admin y contraseña Abcd1234. Manejo de Sesiones: Guarda un token en localStorage con una expiración de 15 minutos. Redirige al login si el token expira o no es válido. Gestión de Recursos Proyectos: Listado de proyectos dinámico. Creación, actualización y eliminación. Tecnologías: Listado y operaciones CRUD. Personas: Gestión de desarrolladores asociados a proyectos.

📚 Conclusión Este proyecto integra tecnologías modernas como Astro, React y TailwindCSS para crear una experiencia de usuario dinámica y profesional. Además, demuestra cómo consumir datos de una API REST y manejar autenticación básica en una aplicación web.

🙏 Contribuciones y Agradecimientos Autor: Fernando Iglesias Leyva Agradecimientos: Profesores del Colegio Vedruna Sevilla por su apoyo y enseñanzas.

📜 Licencia Este proyecto está licenciado bajo la GNU General Public License (GPL).

📧 Contacto Email: fernando.iglesias@example.com GitHub: feriley LinkedIn: Fernando Iglesias
