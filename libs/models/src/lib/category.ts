import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from '.';
import { ModelBase } from './base';

@Entity('categories')
export class Category extends ModelBase {
  @Column()
  name!: string;

  @Column()
  description!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
