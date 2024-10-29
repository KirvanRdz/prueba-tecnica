prueba-tecnica
Aplicación de Gestión de Usuarios
 📋 Descripción Esta aplicación permite gestionar usuarios mediante operaciones CRUD, con dos versiones de la API: 
Versión v1: Operaciones básicas de usuarios. 
Versión v2: Extiende la funcionalidad de la versión v1, añadiendo los campos de edad y fecha de nacimiento. 
El proyecto se ejecuta utilizando Docker para facilitar su despliegue y PostgreSQL como base de datos.
Requisitos previos:
1.	Docker instalado.
2.	Docker Compose configurado.
3.	
Pasos para ejecutar la aplicación:
1.	Clona el repositorio: git clone https://github.com/KirvanRdz/prueba-tecnica.git cd prueba-tecnica
2.	Construye y levanta los contenedores:
docker-compose up --build
3.	Verifica que los servicios están corriendo
API: Disponible en http://localhost:8080 PostgreSQL: Escuchando en el puerto 5432
4.	detener los contenedores docker-compose down
Rutas principales del API. 
Versión v1 
Método Ruta Descripción 
POST /api/v1/users/register Crear un nuevo usuario 
GET /api/v1/users/:userId Obtener un usuario por su ID 
PUT /api/v1/users/:userId Actualizar un usuario por su ID 
DELETE /api/v1/users/:userId Eliminar un usuario por su ID
Versión v2 
Método Ruta Descripción 
POST /api/v2/users/register Crear un nuevo usuario 
GET /api/v2/users/:userId Obtener un usuario por su ID 
PUT /api/v2/users/:userId Actualizar un usuario por su ID 
DELETE /api/v2/users/:userId Eliminar un usuario por su ID
