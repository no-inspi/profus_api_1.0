const express = require('express');
const { dbexport } = require('../utils/db');

const router = express.Router();
const { isAuthenticated } = require('../middlewares');

router.get('/get_users', async (req: any, res: any) => {
    const users = await dbexport.user.findMany()

    res.json(users);
})

module.exports = router;