# Make your CV faster, better, stronger

## What's inside?

This monorepo project uses a turborepo as a basic architecture. [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager.

### Apps and Packages

- `backend`: a NodeJs/Express app
- `frontend`: a Client React app
- `database`: MongoDB stored in AWS Atlas Cluster
- `ui`: a stub React component library shared by both `frontend` and `backend` applications
- `config`: configurations (`eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

Setup local `.env` configuration from `.ENV_TEMPLATE`, after that:
```
cd cvify
yarn install
```

### Build

To build all apps and packages, run the following command:

```
cd cvify
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd cvify
yarn run dev
```
