# Imagen base oficial de Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "index.js"]
