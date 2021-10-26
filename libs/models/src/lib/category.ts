import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from '.';
import { ModelBase } from './base';

@Entity('categories')
export class Category extends ModelBase {
  @Column()
  name!: string;

  @Column({ nullable: true })
  code!: string;

  @Column()
  description!: string;

  @OneToMany(() => Product, (product) => product.category, { eager: true })
  products!: Product[];
}
