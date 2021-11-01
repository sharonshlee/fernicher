import { Column, Entity, ManyToOne } from 'typeorm';
import { User, Product } from '.';
import { ModelBase } from './base';

@Entity('favourites')
export class Favourite extends ModelBase {
  @ManyToOne(() => User, (user) => user.favourites)
  user!: User;

  // eager will load products for this favourite id
  @ManyToOne(() => Product, (product) => product.favourites, { eager: true })
  product!: Product;

  @Column()
  userId!: number;

  @Column()
  productId!: number;
}
