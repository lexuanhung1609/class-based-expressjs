import * as express from 'express';
import { UserService } from '../user';
import { AuthController } from './auth.controller';
import { Application, Router } from 'express';

export class AuthRoutes {
  constructor(private router: Router, private userService: UserService, private authController: AuthController) {}

  getAuthRoutes(): Router {
    this.router.post('/login', this.authController.login);
    this.router.post('/register', this.authController.signup);

    return this.router;
  }
}
