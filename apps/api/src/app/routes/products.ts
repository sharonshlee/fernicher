import { Product } from '@fernicher/models';
import { Router } from 'express';
import { ILike, Repository } from 'typeorm';
import { whereBuilder } from './routeHelpers';

export const productRoutes = (productRepository: Repository<Product>) => {
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

  // Create new product
  productRouter.post('/products/new', (req, res) => {
    const newProduct = req.body;
    return productRepository
      .insert(newProduct)
      .then((product) => res.send(product));
  });

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
