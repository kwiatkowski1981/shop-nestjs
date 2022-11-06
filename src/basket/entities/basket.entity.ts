import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShopItemEntity } from "../../shop/entities/shop-item.entity";
import { ShopItemInterface } from "../../types";

@Entity()
export class BasketEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
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

  @Column()
  basketBrutto: number;

  @Column({
    default: true,
  })
  isEmpty: boolean;

  @OneToMany(
    () => ShopItemEntity,
    (shopItem: ShopItemEntity) => shopItem.basket,
  )
  items: ShopItemInterface[];

  itemsCount: number;
}
