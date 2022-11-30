import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ProductDetail } from './product-details.entity';
import { Basket } from '../../basket/entities/basket.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { ProductDescription } from './product-description.entity';
import { ProductList } from "../../product-list/entities/product-list.entity";

@Entity()
export class Product extends BaseEntity {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @OneToOne(() => ProductDetail, (detail: ProductDetail) => detail.product, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  details: ProductDetail;

  @OneToOne(
    () => ProductDescription,
    (description: ProductDescription) => description.product,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  description: ProductDescription;

  @ManyToMany(() => Basket, (basket: Basket) => basket.products, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  baskets: Basket[];

  @ManyToMany(() => Shop, (shop: Shop) => shop.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  shop: Shop;

  @ManyToOne(
    () => ProductList,
    (productList: ProductList) => productList.product,
    { onDelete: 'CASCADE' },
  )
  productList: ProductList;
}
