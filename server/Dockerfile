#### Docker image for node server ####

FROM node:16-slim

WORKDIR /server

COPY . .

RUN npm install

CMD ["npm", "run", "start"]

EXPOSE $PORT

