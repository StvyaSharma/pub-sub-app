FROM node:18-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies (without --frozen-lockfile for initial build)
RUN pnpm install

# Copy the rest of the application
COPY . .

EXPOSE 8080

CMD ["pnpm", "start"]
