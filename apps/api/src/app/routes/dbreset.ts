import { Category, Favourite, Product, User } from '@fernicher/models';
import { Router } from 'express';
import { Repository } from 'typeorm';

export const dbresetRoutes = (
  userRepository: Repository<User>,
  productRepository: Repository<Product>,
  categoryRepository: Repository<Category>,
  favouriteRepository: Repository<Favourite>
) => {
  const dbresetRouter = Router();
  dbresetRouter.get('/dbreset', async (req, res) => {
    const favouriteIds = await favouriteRepository
      .find()
      .then((items) => items.map((item) => item.id));
    const productIds = await productRepository
      .find()
      .then((items) => items.map((item) => item.id));
    const categoryIds = await categoryRepository
      .find()
      .then((items) => items.map((item) => item.id));
    const userIds = await userRepository
      .find()
      .then((items) => items.map((item) => item.id));

    favouriteIds.length > 0 && (await favouriteRepository.delete(favouriteIds));
    productIds.length > 0 && (await productRepository.delete(productIds));
    categoryIds.length > 0 && (await categoryRepository.delete(categoryIds));
    userIds.length > 0 && (await userRepository.delete(userIds));

    const users = await userRepository.save([
      {
        firstName: 'Mark',
        lastName: 'Lae',
        password: 'marklae',
        email: 'marklae@gmail.com',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        password: 'janesmith',
        email: 'janesmith@gmail.com',
      },
      {
        firstName: 'Sara',
        lastName: 'Singh',
        password: 'sarasingh',
        email: 'sarasingh@gmail.com',
      },
      {
        firstName: 'Claire',
        lastName: 'Woo',
        password: 'clairewoo',
        email: 'clairewoo@gmail.com',
      },
      {
        firstName: 'Jerry',
        lastName: 'Ricco',
        password: 'jerryricco',
        email: 'jerryricco@gmail.com',
      },
    ]);

    const categories = await categoryRepository.save([
      {
        code: 'bedroom',
        name: 'Bedroom',
        description:
          '3 wolf moon lyft food truck asymmetrical, flannel paleo kombucha chia hashtag four dollar toast master cleanse franzen. Glossier chillwave truffaut keffiyeh flannel before they sold out.',
      },
      {
        code: 'dining',
        name: 'Dining',
        description:
        '8/10 condiiton. Has small dents in the corners. Pickup only. Message me if you have any questions.'
      },
      {
        code: 'kitchen',
        name: 'Kitchen',
        description:
        'Pickup only. Thanks!'
      },
      {
        code: 'living',
        name: 'Living Room',
        description:
        'Can deliver to anywhere in the GTA!'
      },
      {
        code: 'office',
        name: 'Office',
        description:
        'If you are looking for equipment for your home office, look no further!'
      },
    ]);

    // products(product_name, product_description, image_url, category_id, user_id, product_location)
    const products = await productRepository.save([
      {
        name: 'Dining Table',
        description:
        'Located in the heart of downtown Toronto. Message me to arrange a pickup!',
        image:
          'https://images.unsplash.com/photo-1581404501824-b69dfb89f64c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
        category: categories[1],
        user: users[0],
        productLocation: [43.865822, -79.61982],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
      },

      {
        name: 'Dining Chair',
        description:
        'Great condition - a classic piece. Looking to trade for a coffee table if possible!',
        image:
          'https://images.unsplash.com/photo-1487015307662-6ce6210680f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80',
        category: categories[1],
        user: users[1],
        productLocation: [43.889975, -79.560215],
        location: 'Toronto, ON, Canada',
        condition: 'good',
      },

      {
        name: 'Sofa',
        description:
        'Purchased from Ikea in 2017. 7/10 condition. Thanks!',
        image:
          'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
        category: categories[3],
        user: users[1],
        productLocation: [43.689975, -79.390215],
        location: 'Toronto, ON, Canada',
        condition: 'good',
      },

      {
        name: 'Bed',
        description:
        'Sturdy frame and spring mattress. Pickup only. Message me for more details.',
        image:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
        category: categories[0],
        user: users[2],
        productLocation: [43.189975, -79.890215],
        location: 'Toronto, ON, Canada',
        condition: 'fair',
      },

      {
        name: 'Dresser',
        description:
        'Xtra Large dresser in great condition.',
        image:
          'https://images.unsplash.com/photo-1609799545166-347a5ba518cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
        category: categories[0],
        user: users[2],
        productLocation: [42.889975, -77.590215],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
      },

      {
        name: 'Floor Lamp',
        description:
        '5 foot tall floor lamp. Great for any room.',
        image:
          'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        category: categories[3],
        user: users[2],
        productLocation: [43.829975, -79.590515],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
      },

      {
        name: 'Arm Chair',
        description:
        'Full arm chair. Pickup only.',
        image:
          'https://images.unsplash.com/photo-1582901109033-8aad6fed8168?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
        category: categories[3],
        user: users[0],
        productLocation: [43.889945, -79.580215],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
      },

      {
        name: 'Mirror',
        description:
        'Full sized mirror - check yourself out in full length!',
        image:
          'https://images.unsplash.com/photo-1556784344-ad913c73cfc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
        category: categories[0],
        user: users[0],
        productLocation: [43.189975, -79.190215],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
      },

      {
        name: 'Coffee Table',
        description:
        'Purchased in 2018 from Ikea. In great condition. Pickup only. Thank you!',
        image:
          'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        category: categories[3],
        user: users[3],
        productLocation: [43.389975, -77.523215],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
      },
      {
        name: 'Rug',
        description:
        'Purchased from Ikea only 4 months ago. Basically in new condition. Message me for details!',
        image:
          'https://images.unsplash.com/photo-1556597249-cd6a997737df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=744&q=80',
        category: categories[3],
        user: users[4],
        productLocation: [43.119975, -79.230215],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
      },
    ]);

    await favouriteRepository.save([
      {
        user: users[0],
        product: products[0],
      },
      {
        user: users[0],
        product: products[1],
      },
      {
        user: users[1],
        product: products[0],
      },
      {
        user: users[1],
        product: products[1],
      },
      {
        user: users[1],
        product: products[2],
      },
      {
        user: users[1],
        product: products[3],
      },
      {
        user: users[2],
        product: products[1],
      },
      {
        user: users[2],
        product: products[2],
      },
    ]);

    res.send('Done reseting database');
  });

  return dbresetRouter;
};
