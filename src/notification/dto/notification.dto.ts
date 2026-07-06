import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    description: 'The title of the notification',
    example: 'New Message',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;
  @ApiProperty({
    description: 'The message of the notification',
    example: 'You have a new message',
  })
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsOptional()
  @IsString()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  updatedAt?: Date;
}
