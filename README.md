Instrucciones para ejecutar el proyecto
1. Inicialización del proyecto
Abre la terminal y asegúrate de estar dentro del directorio principal del proyecto. Luego, ejecuta los siguientes comandos:
npm init


Instala las dependencias necesarias para el funcionamiento de la aplicación:

npm install express mysql2 ejs body-parser express-session dotenv express-validator bootstrap method-override
Para desarrollo, instala nodemon con el siguiente comando:

npm install --save-dev nodemon

2. Configuración de la base de datos
Accede a tu gestor de bases de datos (como MySQL Workbench o phpMyAdmin) y crea una nueva base de datos. El nombre puede ser el que prefieras.

3. Variables de entorno
Para manejar la configuración sensible (como credenciales de la base de datos), crea un archivo llamado .env en la raíz del proyecto.
Este archivo debe incluir las siguientes variables:

DB_HOST=     # Dirección del servidor de la base de datos (normalmente "localhost")
DB_USER=     # Usuario con el que accedes al gestor de base de datos
DB_PASSWORD= # Contraseña correspondiente al usuario
DB_NAME=     # Nombre de la base de datos que creaste
Guarda y cierra el archivo después de agregar la información.

4. Ejecutar la aplicación
Finalmente, desde la terminal y estando en la carpeta raíz del proyecto, ejecuta la aplicación con:

node --watch app.js

Esto iniciará el servidor y aplicará automáticamente los cambios cuando modifiques tu código.

