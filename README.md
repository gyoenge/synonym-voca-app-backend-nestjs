# synonym-voca-app

## Description

📚 Synonym Voca App is an application designed to help with TOEFL study by supporting synonym-based vocabulary learning.
Users can create their own word lists, as well as add, search for, and manage synonyms, allowing them to efficiently expand their vocabulary.

🔑 Key Features

- User Authentication
  - Sign up & Sign in
  - JWT-based authentication
  - Session persistence & authentication verification API
- User Management
  - Retrieve user information
- Collection Management
  - Create, update, and delete personal collections
  - Browse public collections from other users
  - Manage word lists within collections
- Word Management
  - Add, update, and delete words
  - Search words by name
  - Retrieve all words owned by the user
  - Get words by collection ID
 
👉 Upcoming Features

- Advanced synonym learning features will be added in future updates.
 
🖥️ Mockup (Expected) Frontend Web Design

- <img width="466" height="307" alt="image" src="https://github.com/user-attachments/assets/a9d0b9cd-767a-4f73-b5b7-77f496fc6c11" />

📄 API Docs Swagger (Captured)

- <img width="475" height="948" alt="image" src="https://github.com/user-attachments/assets/57acfd9d-1b85-4520-8498-a4f425de140d" />


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

