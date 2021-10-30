import { Product, User } from '@fernicher/models';
import { find, map, orderBy } from 'lodash';
import { In, Like, Repository } from 'typeorm';

export const whereBuilder = (whereFilter) => {
  const where = {};
  for (const key in whereFilter) {
    if (Object.prototype.hasOwnProperty.call(whereFilter, key)) {
      const value = whereFilter[key];
      // https://typeorm.io/#/find-options
      where[key] = Like(value);
    }
  }
  return where;
};

export const loadProductsCommentsUsers = async (
  products: Product[],
  userRepository: Repository<User>
) => {
  const userIds = [];

  map(products, (product) => {
    userIds.push(...map(product.comments, (comment) => comment.userId));
  });

  const users = await userRepository.find({
    where: { id: In(userIds) },
    loadEagerRelations: false,
  });

  const updatedProducts = map(products, (product) => ({
    ...product,
    comments: orderBy(
      map(product.comments, (comment) => ({
        ...comment,
        user: find(users, (user) => user.id === comment.userId),
      })),
      ['id'],
      ['desc']
    ),
  }));
  return updatedProducts;
};
