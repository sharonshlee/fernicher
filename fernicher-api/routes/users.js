const express = require("express");
const router = express.Router();
const { getProductsByUsers } = require("../helpers/dataHelpers");

module.exports = ({ getUsers, getUserByEmail, addUser, getUsersProducts }) => {
  /* GET users listing. */
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/products", (req, res) => {
    getUsersProducts()
      .then((usersProducts) => {
        const formattedProducts = getProductsByUsers(usersProducts);
        res.json(formattedProducts);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // create users / signup
  router.post("/", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    getUserByEmail(email)
      .then((user) => {
        if (user) {
          res.json({
            msg: "Sorry, a user account with this email already exists",
          });
        } else {
          return addUser(firstName, lastName, email, password);
        }
      })
      .then((newUser) => res.json(newUser))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
