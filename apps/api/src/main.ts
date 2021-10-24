import * as express from 'express';
import { createConnection } from 'typeorm';
import { Category, Favourite, Product, User } from '@fernicher/models';
import {
  userRoutes,
  productRoutes,
  categoryRoutes,
  favouriteRoutes,
  dbresetRoutes,
} from './app/routes';

createConnection({
  type: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  entities: [Category, Favourite, Product, User], // Entities/Tables to be included in databae,
}).then((connection) => {
  /** TypeORM repositories variables, one for each table */
  const userRepository = connection.getRepository(User);
  const productRepository = connection.getRepository(Product);
  const categoryRepository = connection.getRepository(Category);
  const favouriteRepository = connection.getRepository(Favourite);

  /** Express server */
  const app = express();

  /** Set transfer limit to 10Mb */
  app.use(express.json({ limit: '10Mb' }));

  /** Routes */
  app.use('/api', userRoutes(userRepository));
  app.use('/api', productRoutes(productRepository));
  app.use('/api', categoryRoutes(categoryRepository));
  app.use('/api', favouriteRoutes(favouriteRepository));

  app.use(
    '/api',
    dbresetRoutes(
      userRepository,
      productRepository,
      categoryRepository,
      favouriteRepository
    )
  );
  const port = process.env.port || 3001;
  const server = app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/api');
  });
  server.on('error', console.error);
});
