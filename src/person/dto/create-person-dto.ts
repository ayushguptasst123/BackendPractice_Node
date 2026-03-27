import {
  IsEmail,
  IsNumberString,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreatePersonDto {
  // This will work because... check main.ts
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumberString({}, { message: 'This is not good beta' })
  numberString: string;

  @IsStrongPassword(
    {
      minLength: 5,
      minLowercase: 0,
      minSymbols: 0,
      minNumbers: 3,
      minUppercase: 1,
    },
    {
      message: 'Password is too weak',
    },
  )
  pass: string;
}
