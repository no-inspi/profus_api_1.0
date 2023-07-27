const { dbexport } = require('../utils/db');
import * as crypto from 'crypto';

export function findUserByEmail(email: any) {
    return dbexport.user.findUnique({
        where: {
            email
        },
    });
}

export function findUserByPseudo(pseudo: any) {
    return dbexport.user.findUnique({
        where: {
            pseudo
        },
    });
}

export function createUserByEmailAndPassword(user: any) {
    user.password = crypto.createHash('sha256').update(user.password).digest('hex');
    return dbexport.user.create({
        data: user,
    });
}

export function createUser(user: any) {
    user.password = crypto.createHash('sha256').update(user.password).digest('hex');
    console.log(user)
    return dbexport.user.create({
        data: user,
    });
    // return 'test'
}

export function findUserById(id: any) {
    return dbexport.user.findUnique({
        where: {
            id,
        },
    });
}

export function updateUserById(id: any, user: any) {
    return dbexport.user.update({
        where: {
            id,
        },
        data: user
    });
}

