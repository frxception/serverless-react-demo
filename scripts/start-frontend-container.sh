#!/bin/sh
# THIS SCRIPT IS INTENDED TO BE RUN FROM THE auth1 PROJECT DIRECTORY
docker run --rm -it --network my-net --name frontend \
    -v $PWD:/mnt/serverless1 \
    -p 8080:3000 \
    -w /mnt/serverless1     bkoehler/feathersjs sh
