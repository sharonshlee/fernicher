import { Product } from '@fernicher/models';
import { Router } from 'express';
import { Repository } from 'typeorm';
import { whereBuilder } from './routeHelpers';

export const productRoutes = (productRepository: Repository<Product>) => {
  const productRouter = Router();
  // Find products
  productRouter.post('/products', (req, res) => {
    const where = whereBuilder(req.body);
    return productRepository
      .find({ where })
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
