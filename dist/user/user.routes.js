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
const express = require('express');
const { dbexport } = require('../utils/db');
const router = express.Router();
const { isAuthenticated } = require('../middlewares');
router.get('/get_users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield dbexport.user.findMany();
    res.json(users);
}));
module.exports = router;
//# sourceMappingURL=user.routes.js.map