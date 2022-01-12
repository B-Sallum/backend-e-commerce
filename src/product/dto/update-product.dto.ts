import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  name: string;

  @IsOptional()
  price: string;

  @IsOptional()
  imgUrl: string;

  @IsOptional()
  description: string;
}
