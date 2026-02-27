# # =========================
# # Stage 1: Builder
# # =========================
# FROM node:18-alpine AS builder

# WORKDIR /app

# # Copy dependency files first for caching
# COPY package.json package-lock.json* ./

# RUN npm install --frozen-lockfile

# # Copy application source
# COPY . .

# # Build Next.js app
# RUN npm run build

# # =========================
# # Stage 2: Runtime
# # =========================
# FROM node:18-alpine AS runner

# WORKDIR /app
# ENV NODE_ENV=production

# # Copy only what is required to run
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next

# EXPOSE 3000

# CMD ["npm", "start"]
# =========================
# Stage 1: Builder
# =========================
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

# =========================
# Stage 2: Runtime
# =========================
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Backend URL for server-side proxy (NOT exposed to browser)
# ENV BACKEND_INTERNAL_URL=http://backend:8000

ARG BACKEND_INTERNAL_URL
ENV BACKEND_INTERNAL_URL=${BACKEND_INTERNAL_URL}

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

EXPOSE 3000
CMD ["npm", "start"]