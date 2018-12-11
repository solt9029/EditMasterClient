FROM node:8

ADD build /build/
ADD server /server/

WORKDIR /server
RUN npm install

EXPOSE 80

CMD node index.js
