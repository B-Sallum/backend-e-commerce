import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Insert a valid name' })
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @IsString({ message: 'Insert a valid pricing' })
  @IsNotEmpty({ message: 'Product price is required' })
  price: string;

  @IsString({ message: 'Insert a valid URL Image' })
  @IsNotEmpty({ message: 'At least on Image is required' })
  imgUrl: string;

  @IsString({ message: 'Insert a valid description' })
  @IsNotEmpty({ message: 'At least on Image is required' })
  @Length(50)
  description: string;
}
