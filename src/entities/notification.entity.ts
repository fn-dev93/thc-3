import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export type NotificationType = 'SMS' | 'EMAIL' | 'PUSH';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Notification {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'varchar' })
  type!: NotificationType;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}

@ChildEntity('EMAIL')
export class EmailNotification extends Notification {
  @Column({ type: 'text' })
  email!: string;

  @Column({ type: 'text' })
  title!: string;
}

@ChildEntity('SMS')
export class SMSNotification extends Notification {
  @Column({ type: 'text' })
  phoneNumber!: string;
}

@ChildEntity('PUSH')
export class PushNotification extends Notification {
  @Column({ type: 'text' })
  pushToken!: string;
}
