#!/bin/bash

# name of the service in docker compose test
TEST_SERVICE_NAME=account-service-test

while getopts ":r" arg; do
  case $arg in
    r)
    docker-compose -f docker-compose.test.yml build --no-cache
    ;;
  esac
done

docker-compose -f docker-compose.test.yml run ${TEST_SERVICE_NAME} --build
docker-compose -f docker-compose.test.yml down -v --remove-orphans
