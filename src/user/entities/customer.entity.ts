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
import { User } from './user.entity';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class Customer extends BaseEntity {
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

  @OneToMany(() => User, (user: User) => user.customer)
  userId: User[];

  @ManyToMany(() => Shop, (shop: Shop) => shop.customers)
  shopId: Shop;
}
