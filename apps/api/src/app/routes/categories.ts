import { Category, User, Comment, Favourite } from '@fernicher/models';
import { Router } from 'express';
import { filter, find, map } from 'lodash';
import { Repository, In } from 'typeorm';
import { whereBuilder } from './routeHelpers';

export const categoryRoutes = (
  categoryRepository: Repository<Category>,
  userRepository: Repository<User>,
  commentRepository: Repository<Comment>,
  favouriteRepository: Repository<Favourite>
) => {
  const categoryRouter = Router();

  // Find categories
  categoryRouter.post('/categories', (req, res) => {
    return categoryRepository.find(req.body).then(async (categories) => {
      // Lookup user for each product
      // for (const category of categories) {
      //   for (const product of category.products) {
      //     product.user = await userRepository.findOne(
      //       { id: product.userId },
      //       { loadEagerRelations: false }
      //     );
      //   }
      // }

      // Get all userIds from all product
      const userIds = [];

      map(categories, (category) => {
        userIds.push(...map(category.products, (product) => product.userId));
      });

      const users = await userRepository.find({
        where: { id: In(userIds) },
        loadEagerRelations: false,
      });

      const productIds = [];
      map(categories, (category) => {
        productIds.push(...map(category.products, (product) => product.id));
      });
      const comments = await commentRepository.find({
        where: { productId: In(productIds) },
        join: {
          alias: 'comment',
          innerJoinAndSelect: {
            user: 'comment.user',
          },
        },
      });

      const favourites = await favouriteRepository.find({
        where: { productId: In(productIds) },
        join: {
          alias: 'favourite',
          innerJoinAndSelect: {
            user: 'favourite.user',
          },
        },
      });

      const updatedCategories = map(categories, (category) => ({
        ...category,
        products: map(category.products, (product) => ({
          ...product,
          comments: filter(
            comments,
            (comment) => comment.productId === product.id
          ),
          favourites: filter(
            favourites,
            (favourite) => favourite.productId === product.id
          ),
          user: find(users, (user) => user.id === product.userId),
        })),
      }));
      // return categories with products per category
      res.send(updatedCategories);
    });
  });

  categoryRouter.get('/categories/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    return categoryRepository
      .findOne(categoryId)
      .then((category) => res.send(category));
  });

  // Create new category
  categoryRouter.post('/categories/new', (req, res) => {
    const newCategory = req.body;
    return categoryRepository
      .save(newCategory)
      .then((category) => res.send(category));
  });

  categoryRouter.put('/categories/:categoryId', (req, res) => {
    const updatedCategory = req.body;
    const categoryId = req.params.categoryId;
    return categoryRepository
      .update(categoryId, updatedCategory)
      .then(() =>
        categoryRepository
          .findOne(categoryId)
          .then((category) => res.send(category))
      );
  });

  categoryRouter.delete('/categories/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    return categoryRepository.delete(categoryId).then(() => res.end());
  });

  return categoryRouter;
};
