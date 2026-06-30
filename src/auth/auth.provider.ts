import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { authRepository } from '../constants';

export const authProviders = [
  {
    provide: authRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DataSource],
  },
];
