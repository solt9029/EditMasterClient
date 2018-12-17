# EditMasterClient

[![CircleCI](https://circleci.com/gh/solt9029/EditMasterClient.svg?style=svg)](https://circleci.com/gh/solt9029/EditMasterClient)

## Environment

- yarn: 1.9.4

- node: 8.11.1


## Setup

```
git clone git@github.com:solt9029/EditMasterClient.git
cd EditMasterClient
yarn install
cd ./src/config
cp api.js.example api.js
cp google-analytics.js.example google-analytics.js
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
