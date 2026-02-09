FROM node:20-alpine

WORKDIR /app

# Copiamos los archivos de paquetes primero para aprovechar el cache de Docker
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de Next.js
EXPOSE 3000

# Encendemos el servidor en modo desarrollo
CMD ["npm", "run", "dev"]