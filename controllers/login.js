const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secret } = require('../utils/config');
const loginRouter = require('express').Router();

loginRouter.post('/', async(req, res, next) => {
    const {username, password} = req.body;
    if(!username)
    {
        return res.status(400).send("Username not provided");
    }
    if(!password)
    {
        return res.status(400).send("Password not provided");
    };
    const user = await User.findOne({username});
    if (!user)
    {
        return res.status(400).send("Invalid username or password");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
    {
        return res.status(400).send("Invalid username or password");
    }

    //declare token and return
    const token = jwt.sign({username: user.username, userId: user._id}, secret, {expiresIn: '1h'});
    return res.json(token);
});

module.exports = loginRouter;
