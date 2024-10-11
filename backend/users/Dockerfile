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
ENV PG_USER=users
ENV PG_PASSWORD=password
ENV PG_HOST=users-db
ENV PG_DATABASE=users_db
ENV PG_PORT=5432

# Expose the port the service will run on
EXPOSE 3008

# Command to run your service
CMD ["yarn", "start"]
