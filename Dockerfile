FROM node:22.14.0-bookworm-slim

# Read environment variables
ARG PORT=5000

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE $PORT

# Command to run the application
CMD ["npm", "start"]