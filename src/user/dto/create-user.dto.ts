import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Please enter a valid name' })
  @IsNotEmpty({ message: 'User Name is required' })
  @Length(3, 150)
  name: string;

  @IsNotEmpty({ message: 'E-mail is required' })
  @IsEmail({ message: 'Please insert a valid e-mail' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter your Birth Date' })
  birthdate: string;

  @IsString()
  @IsNotEmpty({ message: 'User Password is required. 6 - 20 chars' })
  @Length(6, 20)
  pass: string;

  @IsString()
  @IsNotEmpty({ message: 'Password confirmation is required. 6 - 20 chars' })
  @Length(6, 20)
  passConfirm: string;
}
