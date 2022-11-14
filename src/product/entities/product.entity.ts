import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductDetailsEntity } from './product-details.entity';
import { BasketEntity } from '../../basket/entities/basket.entity';
import { ShopEntity } from '../../shop/entities/shop.entity';
import { ProductDescriptionEntity } from './product-description.entity';

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    length: 50,
  })
  name: string;

  @Column({
    type: 'decimal',
    nullable: false,
    default: 0,
    precision: 10,
    scale: 2,
  })
  price: number;

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

  @OneToOne(
    () => ProductDetailsEntity,
    (detail: ProductDetailsEntity) => detail.product,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  details: ProductDetailsEntity;

  @OneToOne(
    () => ProductDescriptionEntity,
    (description: ProductDescriptionEntity) => description.product,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  description: ProductDescriptionEntity;

  @ManyToOne(() => BasketEntity, (basket: BasketEntity) => basket.products, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn()
  basket: BasketEntity;

  @ManyToMany(() => ShopEntity, (shop: ShopEntity) => shop.products)
  shop: ShopEntity;
}
