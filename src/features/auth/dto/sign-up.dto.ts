import { IsDefined, IsNotEmpty, IsEmail, MinLength, Validate, IsPhoneNumber, Matches } from 'class-validator';

export class SignUp {
  @IsDefined()
  @IsNotEmpty()
  readonly firstName: string;

  @IsDefined()
  @IsNotEmpty()
  readonly lastName: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsPhoneNumber('VN')
  readonly phone: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;
}
