# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire project to the container
COPY . .

# Build the React project
RUN yarn build

# Expose the container's port (optional)
EXPOSE 3000

# Start the React server
CMD ["yarn", "dev"]
