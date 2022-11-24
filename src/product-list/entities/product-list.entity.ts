import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class ProductList extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

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

  // @ManyToMany(() => Product, (product: Product) => product.productList, {
  //   onDelete: 'CASCADE',
  //   eager: true,
  // })
  // @JoinTable()
  // products: Product[];
}
