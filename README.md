# Fernicher

> A website for people in the community to donate and get free preloved furnitures.

> Final Year Project by [Sharon Lee](https://github.com/sharonshlee) and [Lewis Lee](https://github.com/rexiah23)

## Final Product

!["Screenshot of Home Page"](https://github.com/sharonshlee/fernicher/blob/master/docs/1_home.png)
!["Screenshot of Filter Category"](https://github.com/sharonshlee/fernicher/blob/master/docs/2a_filter_category.png)
!["Screenshot of Living Room"](https://github.com/sharonshlee/fernicher/blob/master/docs/2b_living_room.png)
!["Screenshot of Filter"](https://github.com/sharonshlee/fernicher/blob/master/docs/3_filter.png)
!["Screenshot of Search"](https://github.com/sharonshlee/fernicher/blob/master/docs/4_search.png)
!["Screenshot of Popular"](https://github.com/sharonshlee/fernicher/blob/master/docs/5_popular.png)
!["Screenshot of Recommendation"](https://github.com/sharonshlee/fernicher/blob/master/docs/6_recommendation.png)
!["Screenshot of Upload"](https://github.com/sharonshlee/fernicher/blob/master/docs/7_upload.png)
!["Screenshot of My Listings"](https://github.com/sharonshlee/fernicher/blob/master/docs/8_my_listing.png)
!["Screenshot of Favourite Map"](https://github.com/sharonshlee/fernicher/blob/master/docs/9_favourite_map.png)
!["Screenshot of Comment"](https://github.com/sharonshlee/fernicher/blob/master/docs/10_comment.png)
!["Screenshot of Email"](https://github.com/sharonshlee/fernicher/blob/master/docs/11_email.png)
!["Screenshot of Chat"](https://github.com/sharonshlee/fernicher/blob/master/docs/12_chat.png)

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

- [ReactJS](https://reactjs.org/)
- [NodeJS](https://nodejs.org/)
- [ExpressJS](http://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Material UI](https://mui.com/)
- [Nx.Dev (monorepos)](https://nx.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [React Google Maps](https://www.npmjs.com/package/react-google-maps)
- [SendGrid](https://signup.sendgrid.com/)
- [Cloudinary](https://cloudinary.com/documentation/how_to_integrate_cloudinary)
