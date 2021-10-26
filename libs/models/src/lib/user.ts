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

  @OneToMany(() => Product, (product) => product.user, { eager: true })
  products!: Product[];

  // eager true will load favourites for that user
  @OneToMany(() => Favourite, (favourite) => favourite.user, { eager: true })
  favourites!: Favourite[];
}
