import { Favourite } from '@fernicher/models';
import { Router } from 'express';
import { Repository } from 'typeorm';
import { whereBuilder } from './routeHelpers';

export const favouriteRoutes = (favouriteRepository: Repository<Favourite>) => {
  const favouriteRouter = Router();

  // Find favourites
  favouriteRouter.post('/favourites', (req, res) => {
    return favouriteRepository
      .find(req.body)
      .then((favourites) => res.send(favourites));
  });

  favouriteRouter.get('/favourites/:favouriteId', (req, res) => {
    const favouriteId = req.params.favouriteId;
    return favouriteRepository
      .findOne(favouriteId)
      .then((favourite) => res.send(favourite));
  });

  // Create new favourite
  favouriteRouter.post('/favourites/new', (req, res) => {
    const newFavourite = req.body;
    return favouriteRepository
      .save(newFavourite)
      .then((favourite) => res.send(favourite));
  });

  favouriteRouter.put('/favourites/:favouriteId', (req, res) => {
    const updatedCategory = req.body;
    const favouriteId = req.params.favouriteId;
    return favouriteRepository
      .update(favouriteId, updatedCategory)
      .then(() =>
        favouriteRepository
          .findOne(favouriteId)
          .then((favourite) => res.send(favourite))
      );
  });

  favouriteRouter.delete('/favourites/:favouriteId', (req, res) => {
    const favouriteId = req.params.favouriteId;
    return favouriteRepository
      .delete(favouriteId)
      .then((favourites) => res.send(favourites));
  });
  return favouriteRouter;
};
