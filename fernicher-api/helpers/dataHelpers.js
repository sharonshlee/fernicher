const getProductsByUsers = (usersProducts) => {
  const productsByUsers = {};

  for (let product of usersProducts) {
    if (!productsByUsers[product.user_id]) {
      productsByUsers[product.user_id] = {
        userId: product.user_id,
        firstName: product.first_name,
        lastName: product.last_name,
        email: product.email,
        products: [],
      };
    }

    productsByUsers[product.user_id].products.push({
      name: product.product_name,
      description: product.product_description,
      location: product.product_location
    });
  }

  return Object.values(productsByUsers);
};

module.exports = {
  getProductsByUsers,
};
