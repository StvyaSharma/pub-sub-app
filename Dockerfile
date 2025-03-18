# Base image with Node.js
FROM node:18-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install supervisor to manage multiple processes
RUN npm install -g supervisor

# Set working directory
WORKDIR /app

# Copy project structure first
COPY package.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

# Install dependencies for both applications
WORKDIR /app/backend
RUN pnpm install
WORKDIR /app/frontend
RUN pnpm install
WORKDIR /app

# Copy all application files
COPY . .

# Build the frontend
WORKDIR /app/frontend
RUN pnpm build

# Create a startup script to run both services
WORKDIR /app
RUN echo '#!/bin/sh\n\
    cd /app/backend && pnpm start & \n\
    cd /app/frontend && pnpm start & \n\
    wait\n' > /app/start.sh

RUN chmod +x /app/start.sh

# Expose both ports
EXPOSE 8080 3000

# Set the startup command
CMD ["/app/start.sh"]
