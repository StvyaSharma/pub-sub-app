# Base image with Node.js
FROM node:18-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Create directory structure
RUN mkdir -p frontend backend

# Copy package.json files first (no root package.json)
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

# Install dependencies for both applications
WORKDIR /app/backend
RUN pnpm install
WORKDIR /app/frontend
RUN pnpm install

# Copy all application files
COPY frontend ./frontend
COPY backend ./backend

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
