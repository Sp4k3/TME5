FROM node:15.5.1-alpine3.12

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . ./

# Set the command when container start running
CMD ["npm", "start"]