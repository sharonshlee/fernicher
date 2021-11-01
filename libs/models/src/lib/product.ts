import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User, Category, Favourite, Comment } from '.';
import { ModelBase } from './base';

@Entity('products')
export class Product extends ModelBase {
  @Column()
  name!: string;

  @Column()
  description!: string;

  //https://www.postgresql.org/docs/7.4/jdbc-binary-data.html
  @Column({ nullable: true })
  image?: string;

  @Column()
  condition!: string;

  @Column()
  color!: string;

  @Column({ nullable: true, type: 'float', array: true })
  productLocation?: number[];

  @Column()
  location!: string;

  @Column({ default: new Date() })
  createdAt!: Date;

  @Column()
  userId: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => User, (user) => user.products)
  user!: User;

  @OneToMany(() => Favourite, (favourite) => favourite.product)
  favourites!: Favourite[];

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];
}
