import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SignIn } from './dto/sign-in.dto';
import { SignUp } from './dto/sign-up.dto';
import { validate } from 'class-validator';
import { BadArguments } from '../../shared';
import { plainToClass } from 'class-transformer';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response): Promise<void> {
    const input = req.body as SignIn;
    const errors = await validate(input);
    if (errors.length > 0) {
      res.json(BadArguments());
    }

    const result = await this.authService.login(input);

    res.json(result);
  }

  async signup(body: SignUp, res: Response): Promise<void> {
    const input = plainToClass(SignUp, body);
    const errors = await validate(input);
    if (errors.length > 0) {
      res.json(BadArguments(`${errors.toString()}`));
    }
    const result = await this.authService.signup(input);

    res.json(result);
  }
}
