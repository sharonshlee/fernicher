import { Category, Favourite, Product, User, Comment } from '@fernicher/models';
import { Router } from 'express';
import { ILike, Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import * as multer from 'multer';
import { loadProductsCommentsUsers } from './routeHelpers';

export const productRoutes = (
  productRepository: Repository<Product>,
  categoryRepository: Repository<Category>,
  userRepository: Repository<User>,
  favouriteRepository: Repository<Favourite>,
  commentRepository: Repository<Comment>
) => {
  const productRouter = Router();
  // Find products
  productRouter.post('/products', (req, res) => {
    return productRepository
      .find({
        ...req.body,
        join: {
          alias: 'product',
          innerJoinAndSelect: {
            user: 'product.user',
          },
          leftJoinAndSelect: {
            comments: 'product.comments',
          },
        },
      })
      .then(async (products) => {
        const updatedProducts = await loadProductsCommentsUsers(
          products,
          userRepository
        );
        res.send(updatedProducts);
      });
  });

  productRouter.post('/products/search', (req, res) => {
    const { name, description, condition, orderBy, desc, take } = req.body;
    const where = [];
    if (name) {
      where.push({ name: ILike(`%${name}%`) });
    }
    if (condition) {
      where.push({ condition: ILike(`%${condition}%`) });
    }
    if (description) {
      where.push({ description: ILike(`%${description}%`) });
    }
    const findOptions = { where, take: take ? take : 1000 };
    if (orderBy) {
      findOptions['order'] = { [orderBy]: desc ? 'DESC' : 'ASC' };
    }
    // select * from products where (name like '%new chair%') or (condition like '%new chair%') or (description like '%new chair%')
    // select * from products where (name like '%c%') or (condition like '%c%') or (description like '%c%')
    return productRepository
      .find({
        ...findOptions,
        join: {
          alias: 'product',
          innerJoinAndSelect: {
            user: 'product.user',
          },
          leftJoinAndSelect: {
            comments: 'product.comments',
            favourites: 'product.favourites',
          },
        },
      })
      .then(async (products) => {
        const updatedProducts = await loadProductsCommentsUsers(
          products,
          userRepository
        );
        res.send(updatedProducts);
      });
  });

  productRouter.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    return productRepository
      .findOne(productId, {
        join: {
          alias: 'product',
          innerJoinAndSelect: {
            user: 'product.user',
          },
          leftJoinAndSelect: {
            comments: 'product.comments',
            favourites: 'product.favourites',
          },
        },
      })
      .then(async (product) => {
        const updatedProducts = await loadProductsCommentsUsers(
          [product],
          userRepository
        );
        res.send(updatedProducts[0]);
      });
  });

  const uploadPath = `${__dirname}/upload/`;
  // Create new product
  productRouter.post(
    '/products/new',
    /** Enable multipart/form-data */
    multer({ dest: uploadPath }).single('image'),
    async (req, res) => {
      const { categoryCode, productLocation, ...theRestOfFields } =
        req.body as {
          categoryCode: string;
          name: string;
          condition: string;
          description?: string;
          productLocation: string;
          userId: number;
        };
      const location = productLocation.split(',').map((item) => Number(item));
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
      });

      const { url } = await cloudinary.uploader.upload(req.file.path);

      const category = await categoryRepository.findOne({ code: categoryCode });
      return productRepository
        .save({
          ...theRestOfFields,
          productLocation: location,
          image: url,
          category,
        })
        .then((product) => res.send(product))
        .catch((err) => console.log(err));
    }
  );

  productRouter.put('/products/:productId', (req, res) => {
    const updatedProduct = req.body;
    const productId = req.params.productId;
    return productRepository.update(productId, updatedProduct).then(() =>
      productRepository
        .findOne(productId, {
          join: {
            alias: 'product',
            innerJoinAndSelect: {
              user: 'product.user',
            },
            leftJoinAndSelect: {
              comments: 'product.comments',
            },
          },
        })
        .then(async (product) => {
          const updatedProducts = await loadProductsCommentsUsers(
            [product],
            userRepository
          );
          res.send(updatedProducts[0]);
        })
    );
  });

  productRouter.delete('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    await favouriteRepository.delete({ productId: Number(productId) });
    await commentRepository.delete({ productId: Number(productId) });
    return productRepository.delete(productId).then(() => res.end());
  });
  return productRouter;
};
