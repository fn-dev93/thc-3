import {
  Notification,
  SMSNotification,
} from '../../entities/notification.entity';
import { NotificationStrategy } from './notification.strategy';

export class SmsStrategy implements NotificationStrategy {
  send(data: Notification): void {
    const smsData = data as SMSNotification;
    // Simulate sending SMS notification logic
    console.log(
      `Sending SMS notification to ${smsData.phoneNumber}: ${smsData.message}`,
    );

    // wait for 2 seconds to simulate sending SMS notification
    setTimeout(() => {
      console.log(
        `SMS notification sent to ${smsData.phoneNumber}: ${smsData.message}`,
      );
    }, 2000);
  }
}
