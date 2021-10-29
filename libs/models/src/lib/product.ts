import { Column, Entity, ManyToOne, OneToMany, Timestamp } from 'typeorm';
import { User, Category, Favourite } from '.';
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

  @Column({ nullable: true, type: 'float', array: true })
  productLocation?: number[];

  @Column()
  location!: string;

  @Column({ default: new Date() })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.products)
  user!: User;

  @OneToMany(() => Favourite, (favourite) => favourite.product)
  favourite!: Favourite;

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;
}
