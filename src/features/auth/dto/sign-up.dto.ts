import { IsDefined, IsNotEmpty, IsEmail, MinLength, Validate, IsPhoneNumber, Matches } from 'class-validator';
import { IsUserExist } from '../../user';

export class SignUp {
  @IsDefined()
  @IsNotEmpty()
  readonly firstName: string;

  @IsDefined()
  @IsNotEmpty()
  readonly lastName: string;

  @IsDefined()
  @IsEmail()
  @Validate(IsUserExist)
  readonly email: string;

  @IsDefined()
  @IsPhoneNumber()
  readonly phone: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;
}
