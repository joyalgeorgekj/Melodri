#!/usr/bin/env bash

DOCKER_STATUS=$(systemctl status docker | grep inactive)

if [[ $DOCKER_STATUS ]]; then
    echo "Starting docker!"
    systemctl start docker
fi

if [[ $1 == "up" ]]; then
    echo "Starting docker compose!"
    cd app/server
    pnpm run build
    cd ../../
    sudo pnpm run docker:up
fi

if [[ $1 == "down" ]]; then
    echo "Stopping docker compose!"
    sudo pnpm run docker:down
fi

if [[ $2 == "rm" ]]; then
    echo "Clearing server image!"
    sudo pnpm run rm:server
fi