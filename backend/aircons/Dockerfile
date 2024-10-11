# Use the Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies (including ts-node)
RUN yarn install --frozen-lockfile

# Copy all application files to the container
COPY . .

# Set environment variables (these can be overridden by Docker Compose)
ENV PG_USER=aircons
ENV PG_PASSWORD=password
ENV PG_HOST=aircons-db
ENV PG_DATABASE=aircons_db
ENV PG_PORT=5432

# Expose the port the service will run on
EXPOSE 3005

# Command to run your service
CMD ["yarn", "start"]
