import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';
import { NotificationDto } from './notification.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDto extends NotificationDto {
  @ApiProperty({
    description: 'The email address of the recipient',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
