import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductList extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  listName: string;

  @Column({
    default: false,
  })
  isDiscounted: boolean;

  @Column({
    type: 'integer',
    nullable: false,
  })
  quantity: number;

  @Column({
    default: false,
  })
  wasEverBought: boolean;

  @Column({
    default: 0,
  })
  boughtCounter: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @ManyToMany(() => Product, (product: Product) => product.productList, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  products: Product[];
}
