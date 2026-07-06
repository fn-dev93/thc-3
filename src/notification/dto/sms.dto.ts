import { ApiProperty } from '@nestjs/swagger';
import { NotificationDto } from './notification.dto';
import { IsNotEmpty } from '@nestjs/class-validator';

export class SmsDto extends NotificationDto {
  @ApiProperty({
    description: 'The phone number of the recipient',
    example: '+5491134567890',
  })
  @IsNotEmpty()
  phoneNumber!: string;
}
