import { Sequelize } from 'sequelize';
import { initializeModels } from '../models';
import { dbConfig } from '../app.config';
import dotenv from 'dotenv';

dotenv.config();

// Use PostgreSQL connection details from user
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect as any,
    logging: false,
    ssl: dbConfig.ssl,
    dialectOptions: dbConfig.dialectOptions,
  }
);

// Initialize all models and associations
initializeModels(sequelize);

// Sync all models with the database
export async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

export { sequelize };