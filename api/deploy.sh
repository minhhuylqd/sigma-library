#!/bin/bash

echo "Pulling Updates"
git pull

echo "Build and Run"
docker-compose up --build -d