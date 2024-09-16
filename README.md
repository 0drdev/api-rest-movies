# API REST de Películas

Bienvenido a la API REST de Películas, un proyecto para gestionar una base de datos de películas utilizando Node.js, Express y MySQL. Esta API proporciona funcionalidades completas para crear, leer, actualizar y eliminar películas.

## Características

- **Obtener todas las películas:** Accede a una lista de todas las películas en la base de datos.
- **Obtener película por ID:** Consulta los detalles de una película específica usando su ID.
- **Crear una nueva película:** Añade una nueva película a la base de datos con todos sus detalles.
- **Actualizar una película existente:** Modifica la información de una película existente.
- **Eliminar una película:** Elimina una película de la base de datos por su ID.

## Tecnologías Utilizadas

- **Node.js:** Plataforma de JavaScript para construir aplicaciones de red escalables.
- **Express:** Framework minimalista para Node.js que facilita la creación de APIs RESTful.
- **Zod:** Biblioteca para la validación de datos de entrada utilizando esquemas.
- **MySQL:** Sistema de gestión de bases de datos relacional (en desarrollo futuro).

## Instalación

1. **Clona el repositorio:**
   ```bash
    git clone 
    cd api-rest-movies
    npm install
    npm start

## Prueba las rutas de la API

Utiliza herramientas como [Postman](https://www.postman.com/) , [cURL](https://curl.se/) o la extensión de visual estudio code [REST CLIENT](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) para interactuar con las siguientes rutas de la API:

Por esa razón esta el archivo api.http para enviar las peticiones con la extension REST CLIENT

- **GET /movies**
  - **Descripción:** Obtiene una lista de todas las películas.
  - **Ejemplo de solicitud:**
    ```bash
    curl -X GET http://localhost:1234/movies
    ```

- **GET /movies/:id**
  - **Descripción:** Obtiene los detalles de una película específica por su ID.
  - **Ejemplo de solicitud:**
    ```bash
    curl -X GET http://localhost:1234/movies/1
    ```

- **POST /movies**
  - **Descripción:** Crea una nueva película en la base de datos. Incluye los detalles de la película en el cuerpo de la solicitud.
  - **Ejemplo de solicitud:**
    ```bash
    curl -X POST http://localhost:1234/movies \
      -H "Content-Type: application/json" \
      -d '{"title": "Inception", "year": 2010, "director": "Christopher Nolan", "duration": 148, "poster": "https://example.com/inception.jpg", "genre": "Sci-Fi", "rate": 8.8}'
    ```

- **PUT /movies/:id**
  - **Descripción:** Actualiza los detalles de una película existente. Incluye los nuevos detalles en el cuerpo de la solicitud.
  - **Ejemplo de solicitud:**
    ```bash
    curl -X PUT http://localhost:1234/movies/1 \
      -H "Content-Type: application/json" \
      -d '{"title": "Inception", "year": 2010, "director": "Christopher Nolan", "duration": 148, "poster": "https://example.com/inception.jpg", "genre": "Sci-Fi", "rate": 9.0}'
    ```

- **DELETE /movies/:id**
  - **Descripción:** Elimina una película de la base de datos por su ID.
  - **Ejemplo de solicitud:**
    ```bash
    curl -X DELETE http://localhost:1234/movies/1
    ```
