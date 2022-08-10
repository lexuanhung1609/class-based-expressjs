import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignIn } from './dto/sign-in.dto';
import { SignUp } from './dto/sign-up.dto';
import { BadArguments, validateInput } from '../../shared';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(body: SignIn, res: Response): Promise<void> {
    const errors = await validateInput(SignIn, body);
    if (errors.length > 0) {
      res.json(BadArguments(`${errors.toString()}`));
    }

    const result = await this.authService.login(body);

    res.json(result);
  }

  async signup(body: SignUp, res: Response): Promise<void> {
    const errors = await validateInput(SignUp, body);

    if (errors.length > 0) {
      res.json(BadArguments(`${errors.toString()}`));
    }
    const result = await this.authService.signup(body);

    res.json(result);
  }
}
