import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class ProductDescriptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    length: 1000,
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @OneToOne(
    () => ProductEntity,
    (product: ProductEntity) => product.description,
    {
      onDelete: 'CASCADE',
    },
  )
  product: ProductEntity;
}
