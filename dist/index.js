"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors = require('cors');
// routes
var user = require('./user/user.routes');
var import_data = require('./import_data');
var item = require('./items/item');
var auth = require('./auth/auth.routes');
var brisage = require('./brisage/brisage');
var graph = require('./items/graph');
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(cors());
app.use(express_1.default.raw());
// use routes
app.use('/users', user);
app.use('/data', import_data);
app.use('/items', item);
app.use('/auth', auth);
app.use('/brisage', brisage);
app.use('/graph', graph);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ "status": "working" });
}));
app.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.item.findMany({
        where: {
            id_: 44,
        },
        include: {
            item_effect: true,
        }
    });
    console.log(allUsers);
    res.json(allUsers);
}));
app.listen(port, () => console.log(`
🚀 Server ready at: http://localhost:3001`));
//# sourceMappingURL=index.js.map