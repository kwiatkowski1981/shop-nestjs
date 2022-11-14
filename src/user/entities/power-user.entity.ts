import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PowerUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.powerUser)
  userId: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;
}
