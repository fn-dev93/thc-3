import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export type NotificationType = 'SMS' | 'EMAIL' | 'PUSH';

@Entity()
export abstract class Notification {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user!: User;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'enum', enum: ['SMS', 'EMAIL', 'PUSH'] })
  type!: NotificationType;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}

export class EmailNotification extends Notification {
  @Column({ type: 'text' })
  email!: string;

  @Column({ type: 'text' })
  title!: string;
}

export class SMSNotification extends Notification {
  @Column({ type: 'int' })
  phoneNumber!: number;
}

export class PushNotification extends Notification {
  @Column({ type: 'text' })
  pushToken!: string;
}
