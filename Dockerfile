FROM node:8
RUN npm install -g serve
WORKDIR /react
CMD serve ./ -p 80
