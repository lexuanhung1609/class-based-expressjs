import { DataSource } from 'typeorm';

const { DB_PORT, DB_USERNAME, DB_PASS, DB_HOST, DB_NAME } = process.env;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASS,
  database: DB_NAME,
  entities: ['../features/**/entity/*.ts'],
});

export default AppDataSource;
