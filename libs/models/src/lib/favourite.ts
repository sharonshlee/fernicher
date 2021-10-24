import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User, Product } from '.';
import { ModelBase } from './base';

@Entity('favourites')
export class Favourite extends ModelBase {
  @ManyToOne(() => User, (user) => user.favourites)
  user!: User;

  @OneToOne(() => Product)
  @JoinColumn()
  product!: Product;
}
