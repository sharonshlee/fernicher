import { Category, Product, User } from '@fernicher/models';
import { Router } from 'express';
import { ILike, Repository } from 'typeorm';
import { whereBuilder } from './routeHelpers';
import { v2 as cloudinary } from 'cloudinary';
import * as multer from 'multer';

export const productRoutes = (
  productRepository: Repository<Product>,
  categoryRepository: Repository<Category>,
  userRepository: Repository<User>
) => {
  const productRouter = Router();
  // Find products
  productRouter.post('/products', (req, res) => {
    return productRepository
      .find(req.body)
      .then((products) => res.send(products));
  });

  productRouter.post('/products/search', (req, res) => {
    const { name, description, orderBy, desc, take } = req.body;
    const where = {};
    if (name) {
      where['name'] = ILike(`%${name}%`);
    }
    if (description) {
      where['description'] = ILike(`%${description}%`);
    }
    const findOptions = { where, take: take ? take : 1000 };
    if (orderBy) {
      findOptions['order'] = { [orderBy]: desc ? 'DESC' : 'ASC' };
    }
    return productRepository
      .find({
        ...findOptions,
        join: {
          alias: 'product',
          innerJoinAndSelect: {
            user: 'product.user',
          },
        },
      })
      .then((products) => res.send(products));
  });

  productRouter.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    return productRepository
      .findOne(productId)
      .then((product) => res.send(product));
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
        };
      const location = productLocation.split(',').map((item) => Number(item));
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
      });

      const { url } = await cloudinary.uploader.upload(req.file.path);

      const user = await userRepository.findOne({ firstName: 'John' }); // Need to grab from logged user session, hard coded for now.
      const category = await categoryRepository.findOne({ code: categoryCode });
      return productRepository
        .save({
          ...theRestOfFields,
          productLocation: location,
          image: url,
          category,
          user,
        })
        .then((product) => res.send(product))
        .catch((err) => console.log(err));
    }
  );

  productRouter.put('/products/:productId', (req, res) => {
    const updatedProduct = req.body;
    const productId = req.params.productId;
    return productRepository
      .update(productId, updatedProduct)
      .then(() =>
        productRepository
          .findOne(productId)
          .then((product) => res.send(product))
      );
  });

  productRouter.delete('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    return productRepository
      .delete(productId)
      .then((products) => res.send(products));
  });
  return productRouter;
};
