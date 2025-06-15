"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.syncDatabase = syncDatabase;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const app_config_1 = require("../app.config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Use PostgreSQL connection details from user
const sequelize = new sequelize_1.Sequelize(app_config_1.dbConfig.database, app_config_1.dbConfig.username, app_config_1.dbConfig.password, {
    host: app_config_1.dbConfig.host,
    port: app_config_1.dbConfig.port,
    dialect: app_config_1.dbConfig.dialect,
    logging: false,
    ssl: app_config_1.dbConfig.ssl,
    dialectOptions: app_config_1.dbConfig.dialectOptions,
});
exports.sequelize = sequelize;
// Initialize all models and associations
(0, models_1.initializeModels)(sequelize);
// Sync all models with the database
async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}
