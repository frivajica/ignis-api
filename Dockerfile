FROM node:16.13.2

# Enviroment variable
ENV WORKDIR=/usr/api/prisma

# Work directory
WORKDIR ${WORKDIR}

#Copying files to work directory
COPY . .
RUN yarn cache clean
RUN yarn install
RUN npm install -g nodemon

# Run and expose the server on port 3000
EXPOSE 3000

# CMD [ "nodemon", "build/app.js" ]
