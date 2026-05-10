
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
## Requirements
- Node.js v.18
- Nest.js v.10


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Test connection

```bash
# The global endpoint prefix is /api 
request http://localhost:3000/api
response 'ok'
```

## Environment
```bash
# Create a new file in the root directory called .env
# Add the following to the .env file
MONGODB_URI=mongodb://tutor_support_admin:tutorpass@localhost:27017/tutor_support?authSource=tutor_support
``` 

Production example:

```bash
MONGODB_URI=mongodb://tutor_support_admin:SECRET_KEY@mongodb:27017/tutor_support?authSource=tutor_support
```


## AWS EC2 Ubuntu
```bash
...
- sudo apt update
- cd korrektur-server
- pm2 start dist/main.js --name korrektur-service
- pm2 stop all
- pm2 restart all
- pm2 list
- pm2 logs
...
```
