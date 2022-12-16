import { IsNotEmpty, IsString } from 'class-validator';

export class ModifyChildrenForChildrenDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  picture: string;
}
