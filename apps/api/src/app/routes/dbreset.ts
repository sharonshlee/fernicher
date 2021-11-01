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
        name: 'Dining Room',
        description:
          '8/10 condiiton. Has small dents in the corners. Pickup only. Message me if you have any questions.',
      },
      {
        code: 'kitchen',
        name: 'Kitchen',
        description: 'Pickup only. Thanks!',
      },
      {
        code: 'living',
        name: 'Living Room',
        description: 'Can deliver to anywhere in the GTA!',
      },
      {
        code: 'office',
        name: 'Office',
        description:
          'If you are looking for equipment for your home office, look no further!',
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
        color: 'brown',
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
        color: 'brown',
      },

      {
        name: 'Sofa',
        description: 'Purchased from Ikea in 2017. 7/10 condition. Thanks!',
        image:
          'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
        category: categories[3],
        user: users[1],
        productLocation: [43.689975, -79.390215],
        location: 'Toronto, ON, Canada',
        condition: 'good',
        color: 'yellow',
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
        color: 'white',
      },
      {
        name: 'Bed Frame',
        description:
          'Sturdy frame and spring mattress. Pickup only. Message me for more details.',
        image:
          'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: categories[0],
        user: users[2],
        productLocation: [43.089975, -79.880215],
        location: 'Toronto, ON, Canada',
        condition: 'good',
        color: 'grey',
      },

      {
        name: 'White Bed Frame',
        description:
          'Sturdy frame and spring mattress. Pickup only. Message me for more details.',
        image:
          'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGJlZHJvb218ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        category: categories[0],
        user: users[2],
        productLocation: [42.189975, -78.890215],
        location: 'Toronto, ON, Canada',
        condition: 'likenew',
        color: 'white',
      },
      {
        name: 'Wooden Bed Frame',
        description:
          'Sturdy wooden frame and spring mattress. Pickup only. Message me for more details.',
        image:
          'https://images.unsplash.com/photo-1561049933-c8fbef47b329?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGJlZHJvb218ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        category: categories[0],
        user: users[2],
        productLocation: [45.189975, -79.990215],
        location: 'Toronto, ON, Canada',
        condition: 'likenew',
        color: 'brown',
      },

      {
        name: 'Dresser',
        description: 'Xtra Large dresser in great condition.',
        image:
          'https://images.unsplash.com/photo-1609799545166-347a5ba518cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
        category: categories[0],
        user: users[2],
        productLocation: [42.889975, -77.590215],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
        color: 'black',
      },

      {
        name: 'Floor Lamp',
        description: '5 foot tall floor lamp. Great for any room.',
        image:
          'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        category: categories[3],
        user: users[2],
        productLocation: [43.829975, -79.590515],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
        color: 'silver',
      },

      {
        name: 'Arm Chair',
        description: 'Full arm chair. Pickup only.',
        image:
          'https://images.unsplash.com/photo-1582901109033-8aad6fed8168?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
        category: categories[3],
        user: users[0],
        productLocation: [43.889945, -79.580215],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
        color: 'brown',
      },

      {
        name: 'Mirror',
        description: 'Full sized mirror - check yourself out in full length!',
        image:
          'https://images.unsplash.com/photo-1556784344-ad913c73cfc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
        category: categories[3],
        user: users[0],
        productLocation: [43.189975, -79.190215],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
        color: 'silver',
      },

      {
        name: 'Coffee Table',
        description:
          'Purchased in 2018 from Ikea. In great condition. Pickup only. Thank you!',
        image:
          'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        category: categories[3],
        user: users[3],
        productLocation: [44.389975, -77.523215],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
        color: 'brown',
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
        color: 'white',
      },
      {
        name: 'Bar stool',
        description:
          'Purchased from Ikea only 1 months ago. Basically in new condition. Message me for details!',
        image:
          'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
        category: categories[2],
        user: users[1],
        productLocation: [41.119975, -75.230215],
        location: 'Toronto, ON, Canada',
        condition: 'like new',
        color: 'brown',
      },
      {
        name: 'Small dining table',
        description: 'Purchased few months ago. Message me for details!',
        image:
          'https://images.unsplash.com/photo-1564383424695-05a0668266ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=941&q=80',
        category: categories[2],
        user: users[1],
        productLocation: [43.118875, -80.230215],
        location: 'Toronto, ON, Canada',
        condition: 'fair',
        color: 'brown',
      },
      {
        name: 'White kitchen shelf',
        description: 'Moving soon, letting this go, message me for details!',
        image:
          'https://images.unsplash.com/photo-1504977402025-84285fea814b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
        category: categories[2],
        user: users[3],
        productLocation: [40.118875, -89.230215],
        location: 'Toronto, ON, Canada',
        condition: 'fair',
        color: 'white',
      },
      {
        name: 'Work table',
        description:
          'Upgrading to new table, letting this go, message me for details!',
        image:
          'https://images.unsplash.com/photo-1542546068979-b6affb46ea8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        category: categories[4],
        user: users[0],
        productLocation: [42.118875, -79.401415],
        location: 'Toronto, ON, Canada',
        condition: 'likenew',
        color: 'white',
      },
      {
        name: 'Small computer table',
        description:
          'Finishing my term soon, letting this go, message me for details!',
        image:
          'https://images.unsplash.com/photo-1621570361070-896021ba01cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        category: categories[4],
        user: users[0],
        productLocation: [46.118775, -79.051415],
        location: 'Toronto, ON, Canada',
        condition: 'fair',
        color: 'brown',
      },
      {
        name: 'Swirling chair',
        description: 'Letting this go, pm me for details',
        image:
          'https://images.unsplash.com/photo-1596485206311-2da5fafb3606?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
        category: categories[4],
        user: users[3],
        productLocation: [45.018775, -79.231415],
        location: 'Toronto, ON, Canada',
        condition: 'fair',
        color: 'black',
      },
      {
        name: 'Nice chair and table',
        description: `Moving soon! Let me know if you're interested`,
        image:
          'https://images.unsplash.com/photo-1605543667606-52b0f1ee1b72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
        category: categories[4],
        user: users[2],
        productLocation: [43.118675, -81.231415],
        location: 'Toronto, ON, Canada',
        condition: 'new',
        color: 'white',
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
