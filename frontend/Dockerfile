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

# Build the application
RUN pnpm build

# Production image
FROM node:18-alpine AS production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY --from=base /app/package.json ./

# Copy built application
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public

# Install only production dependencies
RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]
