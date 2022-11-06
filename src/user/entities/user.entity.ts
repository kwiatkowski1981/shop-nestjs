import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
    type: 'int',
    nullable: false,
  })
  age: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdateAt: Date;

  @Column({
    length: 500,
  })
  address: string;
}
