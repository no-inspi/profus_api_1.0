const { db } = require('../utils/db');
import * as crypto from 'crypto';

export function findUserByEmail(email: any) {
    return db.user.findUnique({
        where: {
            email
        },
    });
}

export function findUserByPseudo(pseudo: any) {
    return db.user.findUnique({
        where: {
            pseudo
        },
    });
}

export function createUserByEmailAndPassword(user: any) {
    user.password = crypto.createHash('sha256').update(user.password).digest('hex');
    return db.user.create({
        data: user,
    });
}

export function createUser(user: any) {
    user.password = crypto.createHash('sha256').update(user.password).digest('hex');
    console.log(user)
    return db.user.create({
        data: user,
    });
    // return 'test'
}

export function findUserById(id: any) {
    return db.user.findUnique({
        where: {
            id,
        },
    });
}

export function updateUserById(id: any, user: any) {
    return db.user.update({
        where: {
            id,
        },
        data: user
    });
}


