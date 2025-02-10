# Utiliser l'image officielle Node.js
FROM node:latest

# Définir le répertoire de travail
WORKDIR /App

# Copier package.json et package-lock.json dans le conteneur
COPY package*.json /App/

# Installer les dépendances
RUN npm install

# Copier tout le reste des fichiers
COPY . /App/

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["node", "index.js"]
