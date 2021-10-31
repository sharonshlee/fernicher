import { Favourite, Comment } from '@fernicher/models';
import { Router } from 'express';
import { In, Repository } from 'typeorm';
import { whereBuilder } from './routeHelpers';
import { countBy, filter, find, map } from 'lodash';

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
    return favouriteRepository.delete(favouriteId).then(() => res.end());
  });
  return favouriteRouter;
};
