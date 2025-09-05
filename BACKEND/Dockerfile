FROM node:20.19.4

# Set working directory
WORKDIR /backend

# Copy only package files first for better caching
COPY package.json yarn.lock ./

# Install dependencies with Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start backend with Yarn
CMD ["yarn", "run", "start"]
