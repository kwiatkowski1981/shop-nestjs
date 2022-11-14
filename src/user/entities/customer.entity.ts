import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ShopEntity } from '../../shop/entities/shop.entity';

@Entity()
export class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: false,
  })
  isVip: boolean;

  @Column({
    default: false,
  })
  isRegular: boolean;

  @Column({
    default: 0,
  })
  customerScoring: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.customer)
  userId: UserEntity[];

  @ManyToMany(() => ShopEntity, (shop: ShopEntity) => shop.customers)
  shopId: ShopEntity;
}
