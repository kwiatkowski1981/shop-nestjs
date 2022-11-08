import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductDetailsEntity } from './product-details.entity';
import { BasketEntity } from '../../basket/entities/basket.entity';
import { ShopEntity } from '../../shop/entities/shop.entity';

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    length: 25,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    default: 'kupa',
  })
  description: string;

  @Column({
    type: 'decimal',
    nullable: false,
    default: 0,
    precision: 10,
    scale: 2,
  })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @Column({
    default: 0,
  })
  boughtCounter: number;

  @Column({
    default: false,
  })
  wasEverBought: boolean;

  @OneToOne(() => ProductDetailsEntity, {
    eager: true,
    onDelete: 'CASCADE', // powinno byc po stronie detail zeby sie tez detail skasowal
  })
  @JoinColumn()
  details: ProductDetailsEntity;

  @ManyToOne(() => BasketEntity, (basket: BasketEntity) => basket.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  basket: BasketEntity;

  @Column({ nullable: true })
  basketId: string;

  @OneToMany(() => ShopEntity, (shop: ShopEntity) => shop.products)
  shop: ShopEntity;
}
