import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  password!: string;
}
