# Take home challenge

## Badges

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/fn-dev93/thc-3/tree/main.svg?style=svg&circle-token=CCIPRJ_FY86qwn5THVp1RPjASQYB7_35af90e9383957ba5c4f7b2c5409820242f28178)](https://dl.circleci.com/status-badge/redirect/gh/fn-dev93/thc-3/tree/main) [![Coverage Status](https://coveralls.io/repos/github/fn-dev93/thc-3/badge.svg)](https://coveralls.io/github/fn-dev93/thc-3)

## Features

- Create authentication system with JWT 
- Implement CRUD operations for notifications (email, push, sms)
    - Create a notification
    - Read notifications by user
    - Update a notification
    - Delete a notification

## Pre-requisites

- Docker and Docker Compose installed on your machine without SUDO privileges
- Ports free: 5000, 5432

## How to run the project

```bash
chmod 711 ./up_dev.sh
./up_dev.sh
```

## How to run the tests

```bash
chmod 711 ./up_test.sh
./up_test.sh
```

## Technologies used

- Node.js (v25.0.0)
- NestJS
- PostgreSQL
- TypeORM

## Areas to improve

- Implement a more robust authentication system with refresh tokens.
- Implement a more comprehensive testing suite with unit tests and integration tests.
- Implement a more user-friendly error handling system with proper error messages and status codes.
- The ORM could be replaced with a more lightweight solution like Prisma or Sequelize to improve performance and reduce complexity.
- Deploy the application to a cloud provider like AWS or Heroku for better scalability and availability.

## Decisions made

- Clean architecture was used to separate the different layers of the application.
- TypeORM was used as the ORM to interact with the PostgreSQL database integrated with NestJS.
- Docker and Docker Compose were used to containerize the application and its dependencies, making it easy to run and deploy.
- Jest was used as the testing framework to write e2e tests for the application, ensuring that the different components work together as expected.
- Strategy pattern was used to implement the different notification types (email, push, sms) in a flexible and extensible way.

## Routes

- API Swagger documentation is available at `http://localhost:5000/api` when the application is running.

## Env variables

Env variables should be set in a `.env` file in the root of the project. An example `.env.example` file is provided.
