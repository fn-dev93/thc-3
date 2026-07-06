import { IsNotEmpty, IsString, MaxLength } from '@nestjs/class-validator';
import { NotificationDto } from './notification.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PushDto extends NotificationDto {
  @ApiProperty({
    description: 'The device token of the recipient',
    example: 'abcdef123456',
  })
  @IsNotEmpty()
  deviceToken!: string;

  @ApiProperty({
    description: 'The message of the push notification',
    example: 'You have a new message',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  declare message: string;
}
