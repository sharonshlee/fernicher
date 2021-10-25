import { User } from '@fernicher/models';
import { Router } from 'express';
import { Repository } from 'typeorm';
import { whereBuilder } from './routeHelpers';

export const userRoutes = (userRepository: Repository<User>) => {
  const userRouter = Router();

  // Find users
  userRouter.post('/users', (req, res) => {
    const where = whereBuilder(req.body);
    return userRepository.find({ where }).then((users) => res.send(users));
  });

  // query to get all the products from the favourites table that only match a specific user_id?
  userRouter.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    return userRepository.findOne(userId).then((user) => res.send(user));
  });

  // Create new user
  userRouter.post('/users/new', (req, res) => {
    const newUser = req.body;
    return userRepository.insert(newUser).then((user) => res.send(user));
  });

  userRouter.put('/users/:userId', (req, res) => {
    const updatedUser = req.body;
    const userId = req.params.userId;
    return userRepository
      .update(userId, updatedUser)
      .then(() =>
        userRepository.findOne(userId).then((user) => res.send(user))
      );
  });

  userRouter.delete('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    return userRepository.delete(userId).then((users) => res.send(users));
  });

  return userRouter;
};
