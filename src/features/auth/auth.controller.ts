import { AuthService } from './auth.service';
import { SignIn } from './dto/sign-in.dto';
import { Response as Res } from '../../shared';
import { Express, Request, Response } from 'express';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response): Promise<Res> {
    return await this.authService.login(req.body);
  }

  async signup(req: Request, res: Response): Promise<Res> {
    console.log(this.authService);
    return await this.authService.signup(req.body);
  }
}
