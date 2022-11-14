import { IsDateString, IsString, IsUUID, Length } from 'class-validator';

export class CreateProductDescriptionDto {
  @IsUUID()
  id?: string;

  @IsString()
  @Length(5, 1000, { message: 'The description length is wrong' })
  description: string;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  lastUpdateAt?: Date;
}
