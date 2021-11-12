# API gateway service

[Gateway](https://microservices.io/patterns/apigateway.html) service that acts as entry point for our app. Handles request authentication & authorization and passes request to other services.

All requests coming from outside user have to be passed through this service (no other services should expose their ports publicly - with the exception of development environment).

## Development

Structure of this service conforms to WEXO NFT MARKET submodule structure. Read the WEXO base repository [README](https://gitlab.com/01people/wexo/wexo-base-typescript-node/-/blob/develop/README.md) for development details and info how to get started with development.

## API documentation

API documentation for user facing endpoints can be viewed [here](https://documenter.getpostman.com/view/3385548/TWDRsKoo).
