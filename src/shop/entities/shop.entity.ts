import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { CustomerEntity } from '../../user/entities/customer.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { BasketEntity } from '../../basket/entities/basket.entity';

@Entity()
export class ShopEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ProductEntity, (product: ProductEntity) => product.shop)
  @JoinTable()
  products: ProductEntity[];

  @ManyToMany(
    () => CustomerEntity,
    (customer: CustomerEntity) => customer.shopId,
  )
  @JoinTable()
  customers: CustomerEntity[];

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.shop)
  @JoinTable()
  users: UserEntity[];

  @ManyToMany(() => BasketEntity, (basket: BasketEntity) => basket.shopId)
  @JoinTable()
  baskets: BasketEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;
}
