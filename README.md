# EditMasterClient

[![CircleCI](https://circleci.com/gh/solt9029/EditMasterClient.svg?style=svg)](https://circleci.com/gh/solt9029/EditMasterClient)


## Environment

- yarn: 1.9.4
- node: 10.11.0


## Setup

```
git clone git@github.com:solt9029/EditMasterClient.git
cd EditMasterClient
yarn install
cp .env.development.local.example .env.development.local
cp .env.production.local.example .env.production.local
cp ./server/.env.example ./server/.env
```


## Usage

- start development mode
```
yarn start
```

- build 
```
yarn build
```

- deploy to gh-pages
```
yarn deploy
```


## Docker

- commit
```
docker login
docker build --tag=solt9029/editmasterclient:latest .
docker push solt9029/editmasterclient:latest
```

- pull
```
docker pull solt9029/editmasterclient:latest
docker run -d -p 8053:80 solt9029/editmasterclient:latest
```


## Release

```
git tag v*.*
git push origin v*.*
```
