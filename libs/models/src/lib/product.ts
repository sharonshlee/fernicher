import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
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

  @Column({ nullable: true, type: 'float', array: true })
  productLocation?: number[];

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user!: User;

  @OneToMany(() => Favourite, (favourite) => favourite.product, {
    eager: true,
  })
  favourite!: Favourite;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category!: Category;
}
