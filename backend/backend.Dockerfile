# Use a lightweight Node image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the server code
COPY server.js .

# Expose the port Express runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
