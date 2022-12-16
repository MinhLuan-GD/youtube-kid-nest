import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChildrenDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  month: string;

  @IsString()
  @IsNotEmpty()
  content_settings: string;

  @IsString()
  @IsNotEmpty()
  picture: string;
}
