# Bootcamp2Workspace

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@bootcamp-workspace/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

<<==============================================================================>>

Bootcamp Specific
<<=============>>

REFERENCES
<<======>>

ORM + Postgress by
https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f

TypeOrm Migraitions https://typeorm.io/#/migrations
Manual Build TypeORM due to problem with migrations - https://github.com/eliziario/typeorm/blob/master/DEVELOPER.md
Use Github branch as dependency in package.json - https://medium.com/@jonchurch/use-github-branch-as-dependency-in-package-json-5eb609c81f1a
Local dependency in package.json - https://stackoverflow.com/questions/14381898/local-dependency-in-package-json

TypeOrm Usage Docs & git - https://github.com/typeorm/typeorm
TypeOrm Indices - https://github.com/typeorm/typeorm/blob/master/docs/indices.md

<<==============================================================================>>

  Usage Manual
<<=============>>

GENERATING NEW MIGRATION FILE

   RUN MIGRATION AFTER ENTITIES CHANGES
<<=======================================>>

npm run typeorm:migration:generate my_init

   RESET DATABASE & GENERATE SEED
<<==================================>>

npm run "start:dev:db:seed"

   AUTOMATIC TESTING
<<====================>>

   BOOTCAMP-API E2E
<<====================>>
npm run test:e2e

   MANUAL TESTING
<<=================>>

   TESTING 
<<==========>>


******************
***** CREATE ****
******************

POSITIVE - CREATE SUCCESSFULL
curl -X POST http://localhost:3333/api/accounts -d '{"firstName": "adi", "lastName": "cohen", "email": "test1508-1@gmail.com", "password": "pw1508-1", "passwordRepeat": "pw1508-1"}' -H "Content-Type: application/json"

NEGETIVE - CREATE FAIL - First name too short
curl -X POST http://localhost:3333/api/accounts -d '{"firstName": "a", "lastName": "cohen", "email": "test1508-1@gmail.com", "password": "pw1508-1", "passwordRepeat": "pw1508-1"}' -H "Content-Type: application/json"

NEGETIVE - CREATE FAIL - Several errors, First name too short, password do not match
curl -X POST http://localhost:3333/api/accounts -d '{"firstName": "a", "lastName": "cohen", "email": "test1508-1@gmail.com", "password": "pw1508-1"}' -H "Content-Type: application/json"

*********************
  ** AUTHENTICATE **
*********************
curl -X POST http://localhost:3333/api/accounts/auth/login -d '{"email": "admin.bootcamp@gmail.com", "password": "0123456789"}' -H "Content-Type: application/json"

******************
  ** PROFILE **
******************
curl http://localhost:3333/api/accounts/me/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYmVjNWRhYS1iNjc0LTQ4NzktOGEzOS01NzMxNWIzYmQzNWQiLCJmaXJzdE5hbWUiOiJhZG1pbiIsImxhc3ROYW1lIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluLmJvb3RjYW1wQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJpYXQiOjE1NzU5NzE5MTEsImV4cCI6MTU3NTk3MjIxMX0.Oq8U7jOA6_22T_nTb1TohC14_5ushwskjuf8wr0DJ9Q"


curl http://localhost:3333/api/profile -H "Authorization: Bearer 6415db6ca9f896133a0c102efd9ff8825a2be749a49dde5d1c6b49eee9c35401a556ed2d4dd8975bcf179772f5873b4d4d97b9d8c009903389f73831bcf158ad2b19d0e01573a2bac41e08bf011f150753256ecb3f3aa723fa448c7569d2e7d9c26e7ea0081f49328adb87ec6cf97a8a2a75a395eff3b4ed127048637dd31688a0d4d2585b26109e42e97b91acfd785c3e8b5d0be3134bedea2726bf4e69ce302250fc2e9dcfbbc45774da4352a9954a9ff3e7244ac122bc00bfba948acb8049510b0f97faa88ec82e5e3a1b0e6422a987bbd13b2f07c6f04a63cca9f5e9714323c46e96c5b19a3b900e800d5efbfcc1b3f46151fdf1ae7755ec35457620c2ebcb74a9c5b9108beb861879aa2db79f233166da8786e37cc199c0e71fe5e8e54393ce4d3e7064913d79c11b3bd59c55904746a457e4b830220cfff8976f6ed03f622f1c1b4b9ca8e7c7256d070c5ba766b6e73bae1f1d2887a880b76ab4b1a2c4caf22ca99e4879c37fd5668d43f0be5a0c286bd65242c7e27c19679ff95333b89400d3c22e0c3fe078ca2f029ccc2ec63e8d1118dacfe5e7169d305ef77cd78718bf02a67b71d6f7"


GET ALL ACCOUNTS
curl -X GET http://localhost:3333/api/accounts -H "Content-Type: application/json"

GET ACCOUNT BY ID
curl -X GET http://localhost:3333/api/accounts/944eff46-eb81-4e50-85cb-531af2f74abb -H "Content-Type: application/json"

GET ACCOUNT BY EMAIL
curl -X GET http://localhost:3333/api/accounts/email/test9377-1@gmail.com -H "Content-Type: application/json"

PUT ACCOUNT

curl -X PUT http://localhost:3333/api/accounts/944eff46-eb81-4e50-85cb-531af2f74abb -d '{"firstName": "adi", "lastName": "cohen"}' -H "Content-Type: application/json"

CREATE ACCOUNT

curl -X POST http://localhost:3333/api/accounts -d '{"firstName": "adi", "lastName": "cohen", "email": "adico1@gmail.com", "password": "1234567890", "passwordRepeat": "1234567890"}' -H "Content-Type: application/json"

VERIFY_EMAIL

curl -X POST http://localhost:3333/api/accounts/auth/verify-email -d '{"verification": "b984356c-7daa-431e-880a-3dd316096355"}' -H "Content-Type: application/json"

REFRESH ACCESS TOKEN

curl -X POST http://localhost:3333/api/accounts/auth/refresh-access-token -d '{"refreshToken": "5eec3f21-a9c7-4b09-8e73-975ccf09c59c"}' -H "Content-Type: application/json"

FORGOT PASSWORD
curl -X POST http://localhost:3333/api/accounts/auth/forgot-password -d '{"email": "adi1@gmail.com"}' -H "Content-Type: application/json"

FORGOT PASSWORD VERIFY

curl -X POST http://localhost:3333/api/accounts/auth/forgot-password-verify -d '{"verification": "cc81e719-7772-4f64-a90d-7971f58b65e8"}' -H "Content-Type: application/json"

RESET PASSWORD

curl -X POST http://localhost:3333/api/accounts/auth/reset-password -d '{"email": "adico1@gmail.com", "password": "1234567890"}' -H "Content-Type: application/json"





The MIT License

Copyright © 2019-2020 Adico

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.