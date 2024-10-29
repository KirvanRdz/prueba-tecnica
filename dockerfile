# Usar una imagen base de Node.js
FROM node:14


# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .


# Comando para iniciar la aplicación
CMD ["npm", "start"]

