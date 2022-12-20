import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  channelId: string;

  @IsString()
  title: string;

  @IsString()
  picture: string;
}
