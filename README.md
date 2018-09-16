# EditMasterClient

## Environment

- yarn: 1.9.4

- node: 8.11.1


## Setup

```
git clone git@github.com:solt9029/EditMasterClient.git
cd EditMasterClient
yarn install
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


## Deploy

- gh-pages branch of this repo has production js files and Dockerfile and docker-compose.yml

```
git clone git@github.com:solt9029/EditMasterClient.git
cd EditMasterClient
git branch gh-pages origin/gh-pages
git checkout gh-pages
docker-compose up -d
```
