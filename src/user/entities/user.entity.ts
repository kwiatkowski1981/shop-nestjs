import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PowerUser } from './power-user.entity';
import { Address } from './address.entity';
import { Customer } from './customer.entity';
import { BlackListUser } from './black-list-users.entity';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    length: 75,
  })
  firstName: string;

  @Column({
    nullable: false,
    length: 100,
  })
  lastName: string;

  @Column({
    nullable: false,
  })
  birthDate: Date;

  @Column({
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    length: 36,
    nullable: true,
  })
  passwordHash: string;

  @Column({
    default: false,
  })
  isPowerUser: boolean;

  @Column({
    default: false,
  })
  isCustomer: boolean;

  @Column({
    default: false,
  })
  isOnBlackList: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @Column()
  lastLogin: Date;

  @ManyToOne(() => PowerUser, (powerUser: PowerUser) => powerUser.userId)
  powerUser: PowerUser;

  @ManyToOne(() => Customer, (customer: Customer) => customer.userId)
  customer: Customer;

  @OneToMany(() => Address, (address: Address) => address.id)
  address: Address;

  @ManyToOne(
    () => BlackListUser,
    (blackListUsers: BlackListUser) => blackListUsers.id,
  )
  blackList: BlackListUser;

  @ManyToMany(() => Shop, (shop: Shop) => shop.id)
  shop: Shop;
}
