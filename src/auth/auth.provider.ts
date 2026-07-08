import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { authRepository } from '../constants';
import { JwtAuthGuard } from './guards/auth.guard';

export const authProviders = [
  {
    provide: authRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DataSource],
  },
  {
    provide: 'AUTH_GUARD',
    useValue: JwtAuthGuard,
  },
  JwtAuthGuard,
];
