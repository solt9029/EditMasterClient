FROM node:8

WORKDIR /react

COPY ./package.json /react/
COPY ./package-lock.json /react/
RUN npm install

RUN npm install -g request
RUN npm link

COPY ./server.js /react/
CMD node server.js
