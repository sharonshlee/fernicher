import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User, Product } from '.';
import { ModelBase } from './base';

@Entity('favourites')
export class Favourite extends ModelBase {
  @ManyToOne(() => User, (user) => user.favourites)
  user!: User;

  // @ManyToOne(() => User, (user) => user.products, { eager: true })
  // product!: Product;
  @ManyToOne(() => Product, (product) => product.favourite)
  product!: Product;
}
