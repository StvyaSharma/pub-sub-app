FROM node:18-alpine AS backend-build

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Build backend
WORKDIR /app/backend
COPY backend/package.json ./
RUN pnpm install
COPY backend ./
RUN pnpm build || echo "No build script for backend"

FROM node:18-alpine AS frontend-build

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Build frontend
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN pnpm install
COPY frontend ./
RUN pnpm build

FROM node:18-alpine AS production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set up backend
WORKDIR /app/backend
COPY --from=backend-build /app/backend ./

# Set up frontend
WORKDIR /app/frontend
COPY --from=frontend-build /app/frontend ./

# Add start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 3000 8080

CMD ["/app/start.sh"]
