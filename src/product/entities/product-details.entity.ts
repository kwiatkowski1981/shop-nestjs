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
export class ProductDetailsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    length: 100,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @OneToOne(() => ProductEntity, (product: ProductEntity) => product.details, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}
