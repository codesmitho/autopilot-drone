# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose Vite's default development port
EXPOSE 3000

# Command to run Vite in development mode
CMD ["npm", "run", "dev", "--", "--host"]
