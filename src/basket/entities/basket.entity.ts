import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  // @OneToMany(
  //   () => ShopItemEntity,
  //   (shopItem: ShopItemEntity) => shopItem.basket,
  // )
  // items: ShopItemInterface[];

  itemsCount: number;
}
