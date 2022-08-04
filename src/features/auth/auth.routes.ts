import { AuthController } from './auth.controller';
import { Request, Response, Router } from 'express';

export class AuthRoutes {
  constructor(private router: Router, public authController: AuthController) {}

  getAuthRoutes(): Router {
    this.router.post('/login', (req: Request, res: Response) => this.authController.login(req, res));
    this.router.post('/register', (req: Request, res: Response) => this.authController.signup(req.body, res));

    return this.router;
  }
}
