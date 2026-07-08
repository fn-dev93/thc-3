import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { JwtAuthGuard } from '../src/auth/guards/auth.guard';
import {
  EmailNotification,
  PushNotification,
  SMSNotification,
  Notification,
} from '../src/entities/notification.entity';
import { User } from '../src/entities/user.entity';
import { NotificationController } from '../src/notification/notification.controller';
import { NotificationService } from '../src/notification/notification.service';
import { Server } from 'http';

describe('Notification (e2e)', () => {
  let app: INestApplication;

  const notificationServiceMock = {
    createNotification: jest.fn(),
    updateNotification: jest.fn(),
    deleteNotification: jest.fn(),
    getNotificationsByUserId: jest.fn(),
    getNotificationById: jest.fn(),
  };

  const MockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  const jwtServiceMock = {
    verify: jest.fn().mockResolvedValue({ sub: 1, email: 'test@example.com' }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(MockAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('/POST notification/send-email returns created email notification', async () => {
    notificationServiceMock.createNotification.mockResolvedValue({
      id: '1',
      type: 'EMAIL',
      title: 'Test Email',
      message: 'This is a test email notification.',
      email: 'test@example.com',
    });

    const notification: EmailNotification = {
      type: 'EMAIL',
      title: 'Test Email',
      message: 'This is a test email notification.',
      email: 'test@example.com',
      user: { id: '1' } as User,
      userId: '1',
    };

    const response = await request(app.getHttpServer() as Server)
      .post('/notification/send-email')
      .set('Authorization', 'Bearer test-token')
      .send(notification);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      type: 'EMAIL',
      title: 'Test Email',
      message: 'This is a test email notification.',
      email: 'test@example.com',
    });
  });

  it('/POST notification/send-sms returns created sms notification', async () => {
    notificationServiceMock.createNotification.mockResolvedValue({
      id: '2',
      type: 'SMS',
      message: 'This is a test SMS notification.',
      phoneNumber: '+1234567890',
    });

    const notification: SMSNotification = {
      type: 'SMS',
      message: 'This is a test SMS notification.',
      phoneNumber: '+1234567890',
      user: { id: '1' } as User,
      userId: '1',
    };

    const response = await request(app.getHttpServer() as Server)
      .post('/notification/send-sms')
      .set('Authorization', 'Bearer test-token')
      .send(notification);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '2',
      type: 'SMS',
      message: 'This is a test SMS notification.',
      phoneNumber: '+1234567890',
    });
  });

  it('POST notification/send-push returns created push notification', async () => {
    notificationServiceMock.createNotification.mockResolvedValue({
      id: '3',
      type: 'PUSH',
      message: 'This is a test push notification.',
      pushToken: 'test-push-token',
    });

    const notification: PushNotification = {
      type: 'PUSH',
      message: 'This is a test push notification.',
      pushToken: 'test-push-token',
      user: { id: '1' } as User,
      userId: '1',
    };

    const response = await request(app.getHttpServer() as Server)
      .post('/notification/send-push')
      .set('Authorization', 'Bearer test-token')
      .send(notification);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '3',
      type: 'PUSH',
      message: 'This is a test push notification.',
      pushToken: 'test-push-token',
    });
  });

  it('/PUT notification/:id returns updated notification', async () => {
    notificationServiceMock.updateNotification.mockResolvedValue({
      id: '1',
      type: 'EMAIL',
      title: 'Updated Test Email',
      message: 'This is an updated test email notification.',
      email: 'updated@example.com',
    });

    const notification: Notification = {
      type: 'EMAIL',
      message: 'This is an updated test email notification.',
      user: { id: '1' } as User,
      userId: '1',
    };

    const response = await request(app.getHttpServer() as Server)
      .put('/notification/1')
      .set('Authorization', 'Bearer test-token')
      .send(notification);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      type: 'EMAIL',
      title: 'Updated Test Email',
      message: 'This is an updated test email notification.',
      email: 'updated@example.com',
    });
  });

  it('/DELETE notification/:id returns success message', async () => {
    notificationServiceMock.deleteNotification.mockResolvedValue({
      message: 'Notification deleted successfully',
    });

    const response = await request(app.getHttpServer() as Server)
      .delete('/notification/1')
      .set('Authorization', 'Bearer test-token');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Notification deleted successfully',
    });
  });

  it('/GET notification returns all notifications for a user', async () => {
    notificationServiceMock.getNotificationsByUserId.mockResolvedValue([
      {
        id: '1',
        type: 'EMAIL',
        title: 'Test Email',
        message: 'This is a test email notification.',
        email: 'test@example.com',
      },
    ]);

    const response = await request(app.getHttpServer() as Server)
      .get('/notification')
      .set('Authorization', 'Bearer test-token');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: '1',
        type: 'EMAIL',
        title: 'Test Email',
        message: 'This is a test email notification.',
        email: 'test@example.com',
      },
    ]);
  });

  it('/GET notification/:id returns a notification by ID for a user', async () => {
    notificationServiceMock.getNotificationById.mockResolvedValue({
      id: '1',
      type: 'EMAIL',
      title: 'Test Email',
      message: 'This is a test email notification.',
      email: 'test@example.com',
    });

    const response = await request(app.getHttpServer() as Server)
      .get('/notification/1')
      .set('Authorization', 'Bearer test-token');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      type: 'EMAIL',
      title: 'Test Email',
      message: 'This is a test email notification.',
      email: 'test@example.com',
    });
  });
});
