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
import { PowerUserEntity } from './power-user.entity';
import { AddressEntity } from './address.entity';
import { CustomerEntity } from './customer.entity';
import { BlackListUsersEntity } from './black-list-users.entity';
import { ShopEntity } from '../../shop/entities/shop.entity';
import { EmailAddressEntity } from './email-address.entity';

@Entity()
export class UserEntity extends BaseEntity {
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
  isACustomer: boolean;

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

  @ManyToOne(
    () => PowerUserEntity,
    (powerUser: PowerUserEntity) => powerUser.userId,
  )
  powerUserId: PowerUserEntity;

  @ManyToOne(
    () => CustomerEntity,
    (customer: CustomerEntity) => customer.userId,
  )
  customerId: CustomerEntity;

  @OneToMany(() => AddressEntity, (address: AddressEntity) => address.id)
  addressId: AddressEntity;

  @ManyToOne(
    () => BlackListUsersEntity,
    (blackListUsers: BlackListUsersEntity) => blackListUsers.id,
  )
  blackListId: BlackListUsersEntity;

  @OneToMany(
    () => EmailAddressEntity,
    (email: EmailAddressEntity) => email.userId,
  )
  emailAddressId: EmailAddressEntity[];

  @ManyToMany(() => ShopEntity, (shop: ShopEntity) => shop.id)
  shopId: ShopEntity;
}
