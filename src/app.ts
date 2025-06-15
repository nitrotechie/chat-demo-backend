import express from 'express';
import bodyParser from 'body-parser';
import { setUserRoutes } from './routes/userRoutes';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import productRequestRoutes from './routes/productRequestRoutes';
import { setupSocket } from './sockets/chatSocket';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import { syncDatabase } from './database/database';
import productRoutes from './routes/productRoutes';
import { seedInitialData } from './database/seed';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

setUserRoutes(app);
app.use('/product-request', productRequestRoutes);
app.use('/products', productRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' },
});

setupSocket(io);

const swaggerDocument = YAML.load(__dirname + '/swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

syncDatabase().then(async () => {
    await seedInitialData();
}).catch((error) => {
    console.error('Error syncing database:', error);
});

export default app;