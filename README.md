# Fernicher

> A website for people in the community to donate and get free preloved furnitures.

- Final Year Project by [Sharon Lee](https://github.com/sharonshlee) and [Lewis Lee](https://github.com/rexiah23)

## First Time Setup:

### Database Setup:

(If needed install [Postgres](https://www.postgresql.org/))

In terminal, run these commands:

1. `psql`
2. `CREATE ROLE labber LOGIN SUPERUSER PASSWORD 'labber';`
3. `\q`
4. `psql -U labber`
5. `CREATE DATABASE fernicherdb_ts;`
6. `\q`

### Project Setup

In terminal run this command: `npm install`

### Back End:

In `apps/api` folder, create a .env file based on the .env.example file.

To start api:

1. Open terminal at project root folder (fernicher).
2. Run this command: `npx nx serve api`

To clear and seed data, start the api first, and browse to: `http://localhost:3001/api/dbreset`

Note: Data tables will be automatically created/updated when API is started.

### Front End:

In `apps/fernicher-ui` folder, create a .env file based on the .env.example file.

To start fernicher-ui:

1. Open another terminal at project root folder (fernicher).
2. Run this command: `npx nx serve fernicher-ui`
3. Go to url http://localhost:4200

Powered by:

- [Material UI](https://mui.com/)
- [React Google Maps](https://www.npmjs.com/package/react-google-maps)
- [Nx.Dev (monorepos)](https://nx.dev/)
- [TypeORM](https://typeorm.io/)
- [React](https://reactjs.org/)
- [NodeJS](https://nodejs.org/)
- [ExpressJS](http://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
