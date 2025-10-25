# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source (sans node_modules, dist, etc. grâce à .dockerignore)
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY index.html ./
COPY .env ./
COPY src ./src
COPY public ./public

# Build de l'application
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
COPY server.js ./
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
