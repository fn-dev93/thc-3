import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { notificationProviders } from './notification.provider';
import { NotificationService } from './notification.service';
import { EmailStrategy, PushStrategy, SmsStrategy } from './strategies';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [
    NotificationService,
    EmailStrategy,
    SmsStrategy,
    PushStrategy,
    ...notificationProviders,
  ],
  controllers: [NotificationController],
  imports: [AuthModule],
})
export class NotificationModule {}
