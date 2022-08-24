import { UserService } from './user.service';
import { Response } from 'express';

export class UserController {
  constructor(private userService: UserService) {}

  async getListUsers(res: Response): Promise<void> {
    const result = await this.userService.findAll();

    res.json(result);
  }
}
