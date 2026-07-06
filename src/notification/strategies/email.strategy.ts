import {
  Notification,
  EmailNotification,
} from '../../entities/notification.entity';
import { NotificationStrategy } from './notification.strategy';

export class EmailStrategy implements NotificationStrategy {
  send(data: Notification): void {
    const emailData = data as EmailNotification;
    // Simulate sending email notification logic
    console.log(
      `Sending email notification to ${emailData.email}: ${emailData.message}`,
    );

    // wait for 2 seconds to simulate sending email notification
    setTimeout(() => {
      console.log(
        `Email notification sent to ${emailData.email}: ${emailData.message}`,
      );
    }, 2000);
  }
}
