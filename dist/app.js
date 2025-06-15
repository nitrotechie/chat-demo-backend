"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = require("./routes/userRoutes");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const productRequestRoutes_1 = __importDefault(require("./routes/productRequestRoutes"));
const chatSocket_1 = require("./sockets/chatSocket");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database/database");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const seed_1 = require("./database/seed");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
(0, userRoutes_1.setUserRoutes)(app);
app.use('/product-request', productRequestRoutes_1.default);
app.use('/products', productRoutes_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: '*' },
});
(0, chatSocket_1.setupSocket)(io);
const swaggerDocument = yamljs_1.default.load(__dirname + '/swagger/swagger.yaml');
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
const PORT = process.env.PORT || 3000;
(0, database_1.syncDatabase)().then(async () => {
    await (0, seed_1.seedInitialData)();
}).catch((error) => {
    console.error('Error syncing database:', error);
});
exports.default = app;
