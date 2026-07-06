import { Inject, Injectable } from '@nestjs/common';
import { notificationRepository } from '../constants/repositories';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { EmailStrategy, PushStrategy, SmsStrategy } from './strategies';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(notificationRepository)
    private readonly notificationRepository: Repository<Notification>,
    private readonly emailStrategy: EmailStrategy,
    private readonly smsStrategy: SmsStrategy,
    private readonly pushStrategy: PushStrategy,
  ) {}

  async createNotification(notification: Notification): Promise<Notification> {
    try {
      switch (notification.type) {
        case 'EMAIL':
          this.emailStrategy.send(notification);
          break;
        case 'SMS':
          this.smsStrategy.send(notification);
          break;
        case 'PUSH':
          this.pushStrategy.send(notification);
          break;
      }
      return this.notificationRepository.save(notification);
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async updateNotification({
    id,
    userId,
    notification,
  }: {
    id: string;
    userId: string;
    notification: Partial<Notification>;
  }): Promise<Notification | null> {
    try {
      // Check if the notification exists and belongs to the user
      const existingNotification = await this.notificationRepository.findOneBy({
        id,
      });
      if (!existingNotification) {
        throw new Error(`Notification with id ${id} not found`);
      }
      if (existingNotification.userId !== userId) {
        throw new Error(
          `User with id ${userId} is not authorized to update this notification`,
        );
      }
      // Merge the existing notification with the new data
      const updatedNotification = {
        ...existingNotification,
        ...notification,
        updatedAt: new Date(),
      };
      await this.notificationRepository.update(id, updatedNotification);
      return this.notificationRepository.findOneBy({ id });
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  }

  async deleteNotification(id: string, userId: string): Promise<void> {
    try {
      // Check if the notification exists and belongs to the user
      const existingNotification = await this.notificationRepository.findOneBy({
        id,
      });
      if (!existingNotification) {
        throw new Error(`Notification with id ${id} not found`);
      }
      if (existingNotification.userId !== userId) {
        throw new Error(
          `User with id ${userId} is not authorized to delete this notification`,
        );
      }
      await this.notificationRepository.delete(id);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  async getNotificationsByUserId(userId: string): Promise<Notification[]> {
    try {
      return this.notificationRepository.find({
        where: { userId },
      });
    } catch (error) {
      console.error('Error fetching notifications by userId:', error);
      throw error;
    }
  }

  async getNotificationById(
    id: string,
    userId: string,
  ): Promise<Notification | null> {
    try {
      const notification = await this.notificationRepository.findOneBy({ id });
      if (!notification) {
        throw new Error(`Notification with id ${id} not found`);
      }
      if (notification.userId !== userId) {
        throw new Error(
          `User with id ${userId} is not authorized to view this notification`,
        );
      }
      return notification;
    } catch (error) {
      console.error('Error fetching notification by id:', error);
      throw error;
    }
  }
}
