import { Favourite, User, Comment } from '@fernicher/models';
import { Router } from 'express';
import { filter, find, map } from 'lodash';
import { In, Repository } from 'typeorm';

export const userRoutes = (
  userRepository: Repository<User>,
  favouriteRepository: Repository<Favourite>,
  commentRepository: Repository<Comment>
) => {
  const userRouter = Router();

  // Find users
  userRouter.post('/users', (req, res) => {
    return userRepository.find(req.body).then((users) => res.send(users));
  });

  // query to get all the products from the favourites table that only match a specific user_id?
  userRouter.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    return userRepository.findOne(userId).then(async (user) => {
      const userIds = map(user.products, (product) => product.userId);

      map(user.favourites, (favourite) => {
        userIds.push(favourite.userId);
        userIds.push(favourite.product.userId);
      });
      const users = await userRepository.find({
        where: { id: In(userIds) },
        loadEagerRelations: false,
      });
      const productIds = map(user.products, (product) => product.id);
      const comments = await commentRepository.find({
        where: { productId: In(productIds) },
        join: {
          alias: 'comment',
          innerJoinAndSelect: {
            user: 'comment.user',
            product: 'comment.product',
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
      const updatedUser = {
        ...user,
        products: map(user.products, (product) => ({
          ...product,
          comments: filter(
            comments,
            (comment) => comment.productId === product.id
          ),
          favourites: filter(
            favourites,
            (favourite) => favourite.productId === product.id
          ),
          user: find(users, (u) => u.id === product.userId),
        })),
        favourites: map(user.favourites, (favourite) => ({
          ...favourite,
          user: find(users, (u) => u.id === favourite.userId),
          product: {
            ...favourite.product,
            user: find(users, (u) => u.id === favourite.product.userId),
          },
        })),
      };
      return res.send(updatedUser);
    });
  });

  // Create new user
  userRouter.post('/users/new', (req, res) => {
    const newUser = req.body;
    if (!req.session.user) {
      req.session.user = { email: newUser.email, password: newUser.password };
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
        req.session.user = {
          email: signInData.email,
          password: signInData.password,
        };
      }
      res.redirect(`/api/users/${user.id}`);
      // res.send(user);
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
    return userRepository.delete(userId).then(() => res.end());
  });

  return userRouter;
};
