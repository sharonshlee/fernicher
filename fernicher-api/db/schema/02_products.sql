DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    user_id INTEGER REFERENCES users(id)
);