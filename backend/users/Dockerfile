# Use the Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all application files to the container
COPY . .

# Set environment variables
ENV DATABASE_URL=postgresql://users:password@users-db:5432/users_db

# Expose the port the service will run on
EXPOSE 3007

# Command to run your service and apply migrations
CMD ["sh", "-c", "until pg_isready -h users-db -U users; do sleep 2; done; npx sequelize-cli db:migrate; yarn start"]
