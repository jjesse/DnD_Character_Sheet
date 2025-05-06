# Build stage
FROM node:20.11-alpine3.19 AS builder

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && \
    npm install -g npm@10.2.4 && \
    npm install --legacy-peer-deps --force && \
    npm install @mantine/core@6.0.22 @mantine/hooks@6.0.22 @mantine/notifications@6.0.22 @mantine/form@6.0.22 --save-exact

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:1.25.3-alpine AS production

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/build /usr/share/nginx/html

# Use nginx user
USER nginx

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]