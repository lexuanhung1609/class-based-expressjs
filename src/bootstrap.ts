import { DataSource } from 'typeorm';
import { AuthController, AuthService, AuthRoutes } from './features/auth';
import { User, UserService, UserController, UserRoutes } from './features/user';
import { Router } from 'express';

export const bootstrap = (dataSource: DataSource, router: Router) => {
  //User
  const userRepository = dataSource.getRepository(User);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  const userRoutes = new UserRoutes(router, userController).getUserRoutes();
  //Auth
  const authService = new AuthService(userService);
  const authController = new AuthController(authService);
  const authRoutes = new AuthRoutes(router, authController).getAuthRoutes();

  return {
    userController,
    userService,
    userRepository,
    userRoutes,
    authService,
    authController,
    authRoutes,
  };
};
