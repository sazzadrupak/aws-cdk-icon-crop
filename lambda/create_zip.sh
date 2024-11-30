#! /bin/sh

# Build and run image
docker build -t lambda-nodejs20 .
docker run --name lambda-nodejs20-container -d lambda-nodejs20

# Copy node_modules for packaging
docker cp lambda-nodejs20-container:/usr/src/app/node_modules ./node_module

# Cleanup
docker stop lambda-nodejs20-container
docker rm lambda-nodejs20-container

# Zip function as function.zip
zip -r function.zip .
