import { IsNotEmpty, IsString } from 'class-validator';

export class ModifyChildrenForParentDto {
  name: string;

  picture: string;

  year: string;

  month: string;
}
