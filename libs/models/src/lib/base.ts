import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class ModelBase {
  @PrimaryGeneratedColumn()
  id?: number;
}
