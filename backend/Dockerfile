FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available(npm@5+)
COPY package*.json ./

RUN npm install

# Bundle apps source
COPY . .

# Expose 3000 port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
