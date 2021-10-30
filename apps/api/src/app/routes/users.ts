import { User } from '@fernicher/models';
import { Router } from 'express';
import { Repository } from 'typeorm';
import { whereBuilder } from './routeHelpers';

export const userRoutes = (userRepository: Repository<User>) => {
  const userRouter = Router();

  // Find users
  userRouter.post('/users', (req, res) => {
    return userRepository.find(req.body).then((users) => res.send(users));
  });

  // query to get all the products from the favourites table that only match a specific user_id?
  userRouter.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    return userRepository.findOne(userId).then((user) => res.send(user));
  });

  // Create new user
  userRouter.post('/users/new', (req, res) => {
    const newUser = req.body;
    if (!req.session.user) {
      req.session.user = {email: newUser.email, password: newUser.password}
    }
    return userRepository.save(newUser).then((user) => res.send(user));
  });

  // Sign in
  userRouter.post('/users/signin', async (req, res) => {
    const signInData = req.body;
    const user = await userRepository.findOne({
      email: signInData.email,
      password: signInData.password,
    });
    if (user) {
      if (!req.session.user) {
        req.session.user = {email: signInData.email, password: signInData.password}
      }
      res.send(user);
    } else {
      res.statusCode = 404;
      res.statusMessage = 'User Not found';
      res.send(false);
      res.end();
    }
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
