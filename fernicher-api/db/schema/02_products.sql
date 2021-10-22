DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    image_url TEXT,
    catgory_id INTEGER REFERENCES users(id)
    user_id INTEGER REFERENCES users(id),
    product_location float8 ARRAY
);
  