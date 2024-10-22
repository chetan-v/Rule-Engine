# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./ 

# Install any needed packages
RUN npm install

# Install nodemon globally for live updates
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . . 

# Expose port 5000
EXPOSE 5000

# Command to run the app with nodemon for live reloading
CMD ["nodemon", "server.js"]
