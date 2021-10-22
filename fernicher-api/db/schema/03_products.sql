DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    image_url TEXT,
    category_id INTEGER REFERENCES categories(id),
    user_id INTEGER REFERENCES users(id),
    product_location float8 ARRAY
);
  