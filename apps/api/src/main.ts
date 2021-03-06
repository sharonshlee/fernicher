import * as express from 'express';
import { createConnection } from 'typeorm';
import { Category, Favourite, Product, User, Comment } from '@fernicher/models';
import {
  userRoutes,
  productRoutes,
  categoryRoutes,
  favouriteRoutes,
  commentRoutes,
  dbresetRoutes,
} from './app/routes';

import * as cookieParser from 'cookie-parser';
import * as cookieSession from 'cookie-session';

createConnection({
  type: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  // dropSchema: true, // if api failed to start, uncomment this save the file, and comment it back, then do dbreset
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  entities: [Category, Favourite, Product, User, Comment], // Entities/Tables to be included in databae
}).then((connection) => {
  /** TypeORM repositories variables, one for each table */
  const userRepository = connection.getRepository(User);
  const productRepository = connection.getRepository(Product);
  const categoryRepository = connection.getRepository(Category);
  const favouriteRepository = connection.getRepository(Favourite);
  const commentRepository = connection.getRepository(Comment);

  /** Express server */
  const app = express();

  /** Set transfer limit to 10Mb */
  app.use(express.json({ limit: '10Mb' }));

  /** Use CookieParser and CookieSession */
  app.use(cookieParser());
  app.use(
    cookieSession({
      name: 'session',
      keys: ['keys1'],
    })
  );
  /** Routes */
  app.use(
    '/api',
    userRoutes(
      userRepository,
      favouriteRepository,
      commentRepository,
      productRepository
    )
  );
  app.use(
    '/api',
    productRoutes(
      productRepository,
      categoryRepository,
      userRepository,
      favouriteRepository,
      commentRepository
    )
  );
  app.use(
    '/api',
    categoryRoutes(
      categoryRepository,
      userRepository,
      commentRepository,
      favouriteRepository
    )
  );
  app.use('/api', favouriteRoutes(favouriteRepository));
  app.use(
    '/api',
    commentRoutes(commentRepository, productRepository, userRepository)
  );

  app.use(
    '/api',
    dbresetRoutes(
      userRepository,
      productRepository,
      categoryRepository,
      favouriteRepository,
      commentRepository
    )
  );
  const port = process.env.port || 3001;
  const server = app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/api');
  });
  server.on('error', console.error);
});
