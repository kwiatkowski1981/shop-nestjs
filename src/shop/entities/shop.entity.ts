import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity()
export class ShopEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.shop)
  products: ProductEntity[];
}
