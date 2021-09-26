# Simple Token Service

A simple `fastify-server` running to serve the basic JWT needs (generating, verifying, refreshing).

## Build The Docker Image

```shell
docker build -t simple-token-service:latest .
```

### Quick alternative

```shell
npm run build:latest
```

## Run the image

```shell
docker run --name token --env-file .env -p 4321:4321 simple-token-service:latest
```

### Quick alternative

```shell
npm run docker:latest
```