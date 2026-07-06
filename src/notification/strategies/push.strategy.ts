import {
  Notification,
  PushNotification,
} from '../../entities/notification.entity';
import { NotificationStrategy } from './notification.strategy';

export class PushStrategy implements NotificationStrategy {
  send(data: Notification): void {
    const pushData = data as PushNotification;
    // Simulate sending push notification logic
    console.log(
      `Sending push notification to ${pushData.pushToken}: ${pushData.message}`,
    );

    // wait for 2 seconds to simulate sending push notification
    setTimeout(() => {
      console.log(
        `Push notification sent to ${pushData.pushToken}: ${pushData.message}`,
      );
    }, 2000);
  }
}
