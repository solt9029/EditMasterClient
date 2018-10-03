FROM node:8

WORKDIR /react

COPY ./package.json /react/
COPY ./package-lock.json /react/
RUN npm install

COPY ./server.js /react/
CMD node server.js
