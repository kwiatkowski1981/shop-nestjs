import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class EmailEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  emailTopic: string;

  @Column({
    length: 2500,
  })
  emailBody: string;

  @Column({
    length: 100,
  })
  emailFooter: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.email)
  userId: UserEntity;
}
