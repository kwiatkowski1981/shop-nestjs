import { IsDateString, IsString, Length } from 'class-validator';

export class CreateProductDetailsDto {
  @IsString()
  @Length(5, 100, { message: 'The detail length is wrong.' })
  name: string;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  lastUpdateAt?: Date;
}
