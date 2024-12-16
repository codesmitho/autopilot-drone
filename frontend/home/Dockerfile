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

# Stage 2: Serve the app with Vite preview or another Node.js server
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install a lightweight static file server (or use vite's preview mode)
RUN npm install -g serve

# Copy the build output to the new container
COPY --from=builder /app/dist /app/dist

# Expose the application port
EXPOSE 3000

# Start the app using the serve command
CMD ["serve", "-s", "dist", "-l", "3000"]