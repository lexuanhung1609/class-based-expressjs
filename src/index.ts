import { config } from 'dotenv';
config();
import * as express from 'express';
import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import { Express, Request, Response } from 'express';
import AppDataSource from './configs/db';
import { bootstrap } from './bootstrap';
import { DataSource } from 'typeorm';

const PORT = process.env.PORT;
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

AppDataSource.initialize()
  .then((dataSource: DataSource) => {
    app.listen(PORT, () => {
      console.log(`Connect to server on port : ${PORT}`);
      const initialize = bootstrap(dataSource, express.Router());

      app.use(initialize.authRoutes);
      app.use(initialize.userRoutes);
      app.get('/', (req: Request, res: Response) => {
        res.json({ version: process.env.npm_package_version });
      });
    });
  })
  .catch((err: Error) => {
    console.error('Error during Data Source initialization', err);
  });
