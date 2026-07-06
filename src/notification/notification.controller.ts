import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {
  EmailNotification,
  PushNotification,
  SMSNotification,
} from '../entities/notification.entity';
import { User } from '../entities/user.entity';
import { EmailDto, PushDto, SmsDto } from './dto';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/notification.dto';

@ApiTags('Notification')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @HttpCode(200)
  @ApiOperation({
    summary: 'Send an email notification',
    description: 'Send an email notification to a user',
  })
  @ApiOkResponse({
    description: 'Email notification sent successfully',
  })
  @Post('send-email')
  async sendEmail(@Body() body: EmailDto, @Req() req: any) {
    const userId = (req as { userId: string }).userId;
    const notification: EmailNotification = {
      type: 'EMAIL',
      title: body.title,
      message: body.message,
      email: body.email,
      user: { id: userId } as User,
      userId: userId,
    };
    return this.notificationService.createNotification(notification);
  }

  @HttpCode(200)
  @ApiOperation({
    summary: 'Send an SMS notification',
    description: 'Send an SMS notification to a user',
  })
  @ApiOkResponse({
    description: 'SMS notification sent successfully',
  })
  @Post('send-sms')
  async sendSms(@Body() body: SmsDto, @Req() req: any) {
    const userId = (req as { userId: string }).userId;
    const notification: SMSNotification = {
      type: 'SMS',
      message: body.message,
      phoneNumber: body.phoneNumber,
      user: { id: userId } as User,
      userId: userId,
    };
    return this.notificationService.createNotification(notification);
  }

  @HttpCode(200)
  @ApiOperation({
    summary: 'Send a push notification',
    description: 'Send a push notification to a user',
  })
  @ApiOkResponse({
    description: 'Push notification sent successfully',
  })
  @Post('send-push')
  async sendPush(@Body() body: PushDto, @Req() req: any) {
    const userId = (req as { userId: string }).userId;
    const notification: PushNotification = {
      type: 'PUSH',
      message: body.message,
      pushToken: body.deviceToken,
      user: { id: userId } as User,
      userId: userId,
    };
    return this.notificationService.createNotification(notification);
  }

  @HttpCode(200)
  @ApiOperation({
    summary: 'Update a notification',
    description: 'Update an existing notification for a user',
  })
  @ApiOkResponse({
    description: 'Notification updated successfully',
  })
  @Put(':id')
  async updateNotification(
    @Param('id') id: string,
    @Body() body: NotificationDto,
    @Req() req: any,
  ) {
    const userId = (req as { userId: string }).userId;
    return this.notificationService.updateNotification({
      id: id,
      userId: userId,
      notification: body,
    });
  }

  @HttpCode(200)
  @ApiOperation({
    summary: 'Delete a notification',
    description: 'Delete an existing notification for a user',
  })
  @ApiOkResponse({
    description: 'Notification deleted successfully',
  })
  @Delete(':id')
  async deleteNotification(@Param('id') id: string, @Req() req: any) {
    const userId = (req as { userId: string }).userId;
    return this.notificationService.deleteNotification(id, userId);
  }

  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all notifications for a user',
  })
  @ApiOkResponse({
    description: 'Notifications retrieved successfully',
  })
  @Get()
  async getNotifications(@Req() req: any) {
    const userId = (req as { userId: string }).userId;
    return this.notificationService.getNotificationsByUserId(userId);
  }

  @HttpCode(200)
  @ApiOperation({
    summary: 'Get a notification by ID for a user',
  })
  @ApiOkResponse({
    description: 'Notification retrieved successfully',
  })
  @Get(':id')
  async getNotificationById(@Param('id') id: string, @Req() req: any) {
    const userId = (req as { userId: string }).userId;
    return this.notificationService.getNotificationById(id, userId);
  }
}
