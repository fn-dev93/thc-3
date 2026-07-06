import { Notification } from '../../entities/notification.entity';

export interface NotificationStrategy {
  send(data: Notification): void;
}
