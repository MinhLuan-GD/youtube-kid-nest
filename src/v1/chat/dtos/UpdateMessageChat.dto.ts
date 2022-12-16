import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMessageChatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  picture: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
