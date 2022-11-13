import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AttachmentEntity } from './attachment.entity';

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

  // @ManyToOne(() => UserEntity, (user: UserEntity) => user.emailId)
  // userId: UserEntity;

  @OneToMany(
    () => AttachmentEntity,
    (attachmentId: AttachmentEntity) => attachmentId.emailId,
  )
  attachmentId: AttachmentEntity;
}
