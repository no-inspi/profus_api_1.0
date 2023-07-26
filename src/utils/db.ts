const { PrismaClient } = require('@prisma/client');

export const dbexport = new PrismaClient();

// module.exports = { dbexport };