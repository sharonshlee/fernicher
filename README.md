### Fernicher

A website for people in the community to donate and get free preloved furniture.

Final Year Project by [Sharon Lee](https://github.com/sharonshlee) and [Lewis Lee](https://github.com/rexiah23)

### Setup

### Database First Time Setup (If needed for the next step; Install [Postgres](https://www.postgresql.org/).):

Login to database in terminal:

1. `psql`
2. `CREATE ROLE labber LOGIN SUPERUSER PASSWORD 'labber';`
3. `\q`
4. `psql -U labber`
5. `CREATE DATABASE fernicherdb;`
6. `\q`

### Back End:

In terminal run these commands:

1. `cd fernicher-api`
2. `npm install`
3. `npm run db:reset`
4. `npm run dev`

### Front End:

Open a new terminal run these commands:

1. `cd fernicher-ui`
2. `npm install`
3. `npm start`
4. Go to url http://localhost:3000
