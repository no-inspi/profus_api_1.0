"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastIdUser = exports.updateUserById = exports.findUserById = exports.createUser = exports.createUserByEmailAndPassword = exports.findUserByPseudo = exports.findUserByEmail = void 0;
const { dbexport } = require('../utils/db');
const crypto = __importStar(require("crypto"));
function findUserByEmail(email) {
    return dbexport.user.findMany({
        where: {
            email
        },
    });
}
exports.findUserByEmail = findUserByEmail;
function findUserByPseudo(pseudo) {
    return dbexport.user.findMany({
        where: {
            pseudo
        },
    });
}
exports.findUserByPseudo = findUserByPseudo;
function createUserByEmailAndPassword(user) {
    user.password = crypto.createHash('sha256').update(user.password).digest('hex');
    return dbexport.user.create({
        data: user,
    });
}
exports.createUserByEmailAndPassword = createUserByEmailAndPassword;
function createUser(user) {
    user.password = crypto.createHash('sha256').update(user.password).digest('hex');
    console.log(user);
    return dbexport.user.create({
        data: user,
    });
    // return 'test'
}
exports.createUser = createUser;
function findUserById(id) {
    return dbexport.user.findMany({
        where: {
            id,
        },
    });
}
exports.findUserById = findUserById;
function updateUserById(id, user) {
    return dbexport.user.update({
        where: {
            id,
        },
        data: user
    });
}
exports.updateUserById = updateUserById;
function getLastIdUser() {
    return dbexport.user.findMany({
        orderBy: {
            id_: 'desc'
        }
    });
}
exports.getLastIdUser = getLastIdUser;
//# sourceMappingURL=users.services.js.map