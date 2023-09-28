from node:alpine

# Working directory
WORKDIR /app

# Copy package json files
COPY package*.json ./

# npm install of all nodemodules
RUN npm install

COPY . .

# Expose the API port
EXPOSE 5000

CMD [ "node", "src/index.js"]