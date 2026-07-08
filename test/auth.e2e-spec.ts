import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { Server } from 'http';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  const authServiceMock = {
    login: jest.fn(),
    createUser: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('/POST auth/login returns access token', async () => {
    authServiceMock.login.mockResolvedValue({ accessToken: 'test-token' });

    await request(app.getHttpServer() as Server)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(200)
      .expect({ accessToken: 'test-token' });

    expect(authServiceMock.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('/POST auth/register returns created user', async () => {
    authServiceMock.createUser.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
    });

    await request(app.getHttpServer() as Server)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(201)
      .expect({
        id: '1',
        email: 'test@example.com',
      });

    expect(authServiceMock.createUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
