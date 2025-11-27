# base image -> (neccessary to run application) 
FROM node:22-alpine3.18

# dirctory to store the application source files and folder
WORKDIR /app

# copying the package.json && package-lock.json to /app
COPY package*.json .

# install the packages -> creates node_modules folder
RUN npm install

# copying all the files and folder to /app
COPY . .

# env set
ENV PORT=4000

# port expose
EXPOSE 4000

# command to run application
CMD [ "node", "index.js" ]

