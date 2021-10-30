import { Comment, Product, User } from '@fernicher/models';
import { Router } from 'express';
import { Repository } from 'typeorm';

export const commentRoutes = (
  commentRepository: Repository<Comment>,
  productRepository: Repository<Product>,
  userRepository: Repository<User>
) => {
  const commentRouter = Router();

  // Find comments
  commentRouter.post('/comments', (req, res) => {
    return commentRepository
      .find(req.body)
      .then((comments) => res.send(comments));
  });

  commentRouter.get('/comments/:commentId', (req, res) => {
    const commentId = req.params.commentId;
    return commentRepository
      .findOne(commentId)
      .then((comment) => res.send(comment));
  });

  // Create new comment
  commentRouter.post('/comments/new', async (req, res) => {
    const { comment, userId, productId } = req.body;
    const user = await userRepository.findOne({ id: userId });
    const product = await productRepository.findOne({ id: productId });
    return commentRepository
      .save({ comment, user, product })
      .then((comment) => res.send({ ...comment, user }));
  });

  commentRouter.put('/comments/:commentId', (req, res) => {
    const updatedCategory = req.body;
    const commentId = req.params.commentId;
    return commentRepository
      .update(commentId, updatedCategory)
      .then(() =>
        commentRepository
          .findOne(commentId)
          .then((comment) => res.send(comment))
      );
  });

  commentRouter.delete('/comments/:commentId', (req, res) => {
    const commentId = req.params.commentId;
    return commentRepository.delete(commentId).then(() => res.end());
  });
  return commentRouter;
};
