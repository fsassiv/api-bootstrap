# Stage 1: Build
FROM node:20.11.1-alpine3.19 AS builder

WORKDIR /usr/src/app

# Copy root files
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

# Copy apps and libs
COPY apps ./apps
COPY libs ./libs

RUN npm install --legacy-peer-deps
RUN npm run build auth

# Stage 2: Production
FROM node:20.11.1-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3101

CMD ["node", "dist/apps/auth/main.js"]
