# jsonplaceholder dashboard
Uses [Json Placeholder](https://jsonplaceholder.typicode.com/) API to provide a user dashboard with details.

## Stack
Nuxt, Vue, Typescript, Scss, Docker

## Install

### With docker
**you need [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) to be installed on your system.**
- clone the repo
- ```cd``` to your cloned repo directory
- then ```cp .env.example .env```
- update the .env variables depending on your needs
- run ```docker-compose up -d```
- go into the container `docker exec -ti project sh`
- run yarn commands `yarn dev` or `yarn build`
- browse `http://localhost:3000`

### Without docker
**your need NodeJS and Yarn.**
- clone the repo
- run `yarn`
- run `yarn run dev`
- browse `http://localhost:3000`
