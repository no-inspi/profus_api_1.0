const express = require('express');
const { db } = require('../utils/db');

const router = express.Router();
const { isAuthenticated } = require('../middlewares');

router.get('/get_users', isAuthenticated, async (req: any, res: any) => {
    const users = await db.user.findMany()

    res.json(users);
})

module.exports = router;