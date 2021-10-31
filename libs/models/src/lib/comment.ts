import { Column, Entity, ManyToOne } from 'typeorm';
import { User, Product } from '.';
import { ModelBase } from './base';

@Entity('comments')
export class Comment extends ModelBase {
  @ManyToOne(() => User, (user) => user.favourites)
  user!: User;

  @Column()
  userId: number;

  @Column()
  productId: number;

  // eager will load products for this favourite id
  @ManyToOne(() => Product, (product) => product.favourites)
  product!: Product;

  @Column()
  comment!: string;

  @Column({ default: new Date() })
  createdAt!: Date;
}
