# Yassir Technical Challenge

So in order to make the code more "elegant" and "clean", i've installed different libraries:

- axios to make http request easier with promise support
- http-errors for better error handling

I have separated also the logic to smaller services, instead of throw it all inside the handler function.
Further optimisation i've could think of is to create a `pokemon` folder, move all the services/ models/ handler (controller) inside to seperate our `pokemon` domain, unit tests for the service i've created, api documentation with swagger 😁

## Description

Fastify & TypeScript starter repository.

## Installation

```bash
$ git clone https://github.com/Matschik/fastify-typescript-starter.git
$ cd fastify-typescript-starter
$ npm install
$ rm -rf .git # Remove repository's git directory
```

## Usage

```bash
# development: hot reload with nodemon
$ npm run dev

# debug
$ npm run debug

# format with prettier
$ npm run format

# build for production
$ npm run build

# production
$ npm run prod
```
