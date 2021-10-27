import { Category } from '@fernicher/models';
import { Router } from 'express';
import { Repository } from 'typeorm';
import { whereBuilder } from './routeHelpers';

export const categoryRoutes = (categoryRepository: Repository<Category>) => {
  const categoryRouter = Router();

  // Find categories
  categoryRouter.post('/categories', (req, res) => {
    return categoryRepository
      .find(req.body)
      .then((categories) => res.send(categories));
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
    return categoryRepository
      .delete(categoryId)
      .then((categories) => res.send(categories));
  });

  return categoryRouter;
};
