FROM node:8
RUN npm install -g express
WORKDIR /react
CMD node server
