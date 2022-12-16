import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoHistoryDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
