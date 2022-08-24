import { AuthController } from './auth.controller';
import { Request, Response, Router } from 'express';

export class AuthRoutes {
  constructor(private router: Router, public authController: AuthController) {}

  getAuthRoutes(): Router {
    this.router.post('/auth/login', (req: Request, res: Response) => this.authController.login(req.body, res));
    this.router.post('/auth/register', (req: Request, res: Response) => this.authController.signup(req.body, res));

    return this.router;
  }
}
