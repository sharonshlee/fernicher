import { Comment, Product, User } from '@fernicher/models';
import { Router } from 'express';
import { Repository } from 'typeorm';
import * as sgMail from '@sendgrid/mail';

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
    return commentRepository
      .save({ comment, userId, productId })
      .then(async (comment) => {
        const user = await userRepository.findOne({ id: userId });
        const product = await productRepository.findOne(
          { id: productId },
          {
            join: {
              alias: 'product',
              innerJoinAndSelect: {
                user: 'product.user',
              },
            },
          }
        );

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
          to: product.user.email, // Change to your recipient
          from: process.env.SENDGRID_SENDER, // Change to your verified sender
          subject: `New comment from ${user.firstName}`,
          text: `Hi ${product.user.firstName}, ${user.firstName} commented on your ${product.name}.`,
          // to compress html: https://www.textfixer.com/html/compress-html-compression.php
          html: `<!DOCTYPE html><html> <head> <style> body { margin: auto; width: 50%; padding: 2em; color: #495057; font-family: Arial, Helvetica, sans-serif; } article { border: solid #495057 2px; border-radius: 0.5em; margin-top: 1em; } img { width: 100%; } div { margin: 1em; } a { color: #495057; background-color: #ced4da; border-radius: 5px; padding: 0.5em; text-decoration: none; } </style> </head> <body> <h2>New Comment</h2> <article> <div>${user.firstName} commented on your ${product.name}:</div> <div><i>${comment.comment}</i></div> <div> <img alt="${product.name}" src="${product.image}" /> </div> <div><a href="${process.env.FRONTEND_URL}">View comment here</a></div> </article> </body></html>`,
        };

        sgMail
          .send(msg)
          .catch((err) => console.log('SendGrid error:', err))
          .finally(() => res.send({ ...comment, user }));
      });
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
