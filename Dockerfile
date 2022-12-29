FROM node:18

RUN yarn global add nodemon

WORKDIR /app

COPY ./package.json .
RUN yarn cache clean
RUN yarn install
COPY . .

RUN npx prisma generate

# Run and expose the server on port 3000
EXPOSE 3000

# CMD npm start
CMD [ "nodemon", "build/app.js" ]