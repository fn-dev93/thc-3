import { DataSource } from 'typeorm';
import { notificationRepository } from '../constants/repositories';
import { Notification } from '../entities/notification.entity';

export const notificationProviders = [
  {
    provide: notificationRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Notification),
    inject: [DataSource],
  },
];
