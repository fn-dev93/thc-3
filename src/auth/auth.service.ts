import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { authRepository } from '../constants';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authRepository)
    private readonly authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /// Checks if a user with the given email exists in the database.
  async existsEmail(email: string): Promise<boolean> {
    try {
      const user = await this.authRepository.findOne({ where: { email } });
      return !!user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  /// Creates a new user if the email does not already exist.
  async createUser(authDto: AuthDto): Promise<User> {
    const exists = await this.existsEmail(authDto.email);
    if (exists) {
      throw new Error('Email already exists');
    }

    try {
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(authDto.password, 10);

      // Create a new user entity and save it to the database
      const user = this.authRepository.create({
        email: authDto.email,
        password: hashedPassword,
      });
      // Save the user and return the saved user without the password
      const savedUser = await this.authRepository.save(user);
      return { ...savedUser, password: undefined };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async login(authDto: AuthDto): Promise<string> {
    try {
      const user = await this.authRepository.findOne({
        where: { email: authDto.email },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(
        authDto.password,
        user.password!,
      );
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      return this.generateToken(user);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  generateToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
