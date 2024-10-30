# Stage 1: Build the Vite app
FROM node:18-alpine AS builder

# Install necessary packages for compatibility (optional but can prevent issues)
RUN apk add --no-cache libc6-compat

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json or yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app for production
RUN npm run build

# Stage 2: Serve the app with a lightweight web server (e.g., nginx)
FROM nginx:alpine

# Copy custom nginx configuration file if any
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the build output to nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the application port
EXPOSE 3000

# Start nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
