import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ProductEntity } from '../../product/entities/product.entity';
import { ProductInterface } from '../../types';
import { ShopEntity } from "../../shop/entities/shop.entity";

@Entity()
export class BasketEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  canStayInBasket: Date;

  @Column({
    default: 3600,
  })
  itemRemoveCountdown: number;

  @Column({ nullable: true })
  basketBrutto: number;

  @Column({
    default: true,
  })
  isEmpty: boolean;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.basket)
  products: ProductInterface[];

  @ManyToMany(() => ShopEntity, (shop: ShopEntity) => shop.baskets)
  shopId: ShopEntity;

  productsCount: number;
}
