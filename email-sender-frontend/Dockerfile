# FROM node
# WORKDIR /usr/src/myapp
# COPY . /usr/src/myapp/

# RUN npm install
# CMD [ "npm","start" ]
# Use a lightweight Node.js version for smaller image size
FROM node:20-alpine as builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for optimized caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Build the application (if needed, e.g., for React, Next.js, etc.)
# RUN npm run build   # Uncomment if you have a build step

# Expose the port (modify if your app runs on a different port)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]  # Modify if using `npm start`
