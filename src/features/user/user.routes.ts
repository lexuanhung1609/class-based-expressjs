import { UserController } from './user.controller';
import { Request, Response, Router } from 'express';

export class UserRoutes {
  constructor(private router: Router, public userController: UserController) {}

  getUserRoutes(): Router {
    this.router.get('/user/list', (req: Request, res: Response) => this.userController.getListUsers(res));

    return this.router;
  }
}
