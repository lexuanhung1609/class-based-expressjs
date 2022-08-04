import { UserService } from '../user';
import { SignUp } from './dto/sign-up.dto';
import { SignIn } from './dto/sign-in.dto';
import { BadArguments, DataExist, hashPassword, NotFound, Ok, Response } from '../../shared';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class AuthService {
  constructor(private userService: UserService) {}

  async login(signInData: SignIn): Promise<Response> {
    const user = await this.userService.findOne(signInData.email);

    if (!user) {
      return NotFound('Email not found');
    }

    const compareResult = await bcrypt.compare(signInData.password, user.password);
    if (!compareResult) {
      return BadArguments('Wrong password');
    }

    const payload = { email: user.email, sub: user.id };

    return Ok({
      resource: {
        accessToken: jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' }),
      },
    });
  }

  async signup(signupData: SignUp): Promise<Response> {
    const user = await this.userService.findOne(signupData.email);
    if (user) {
      return DataExist({ resource: { ...user } });
    }
    const password = await hashPassword(signupData.password);

    const userData = { ...signupData, password };
    const createdUser = await this.userService.createUser(userData);

    delete createdUser.password;
    return Ok({
      resource: {
        ...createdUser,
      },
    });
  }

  // async validateUser(validatedData: SignIn): Promise<User> {
  //   const user = await this.userService.findOne(validatedData.email);
  //
  //   if (!user) {
  //     return null;
  //   }
  //
  //   const [salt, storedHash] = user.password.split('.');
  //
  //   const hash = (await scrypt(validatedData.password, salt, 32)) as Buffer;
  //
  //   if (storedHash !== hash.toString('hex')) {
  //     return null;
  //   }
  //   delete user.password;
  //   return user;
  // }
  //
  // async resetPassword(id: number, updateData: Partial<User>): Promise<User> {
  //   const password = await hashPassword(updateData.password);
  //   const user = await this.userService.update(id, { password });
  //
  //   return user;
  // }
}
