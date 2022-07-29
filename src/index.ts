import * as express from 'express';
import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { Express } from 'express';
import { config } from 'dotenv';
import AppDataSource from './configs/db';
import { bootstrap } from './bootstrap';
import { DataSource } from 'typeorm';
import { AuthRoutes } from './features/auth';

config();

const PORT = process.env.PORT;
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

AppDataSource.initialize()
  .then((dataSource: DataSource) => {
    app.listen(PORT, () => {
      console.log(`Connect to server on port : ${PORT}`);
      const initialize = bootstrap(dataSource, express.Router());
      app.use(
        '/auth',
        new AuthRoutes(express.Router(), initialize.userService, initialize.authController).getAuthRoutes(),
      );
    });
  })
  .catch((err: Error) => {
    console.error('Error during Data Source initialization', err);
  });
