import { Column, Entity, OneToMany } from 'typeorm';
import { Product, Favourite } from '.';
import { ModelBase } from './base';

@Entity('users')
export class User extends ModelBase {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];

  @OneToMany(() => Favourite, (favourite) => favourite.user)
  favourites!: Favourite[];
}
