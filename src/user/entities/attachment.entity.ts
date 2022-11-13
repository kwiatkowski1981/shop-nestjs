import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmailEntity } from './email.entity';

@Entity()
export class AttachmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  fileName: string;

  @Column({
    length: 5,
  })
  extension: string;

  @Column({
    length: 255,
  })
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @ManyToOne(() => EmailEntity, (email: EmailEntity) => email.attachmentId)
  emailId: EmailEntity[];
}
