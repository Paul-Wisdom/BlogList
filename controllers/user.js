const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

userRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body;
    if(!username)
    {
        return response.status(400).send({message: "Username not provided"})
    }
    if(!name)
    {
        return response.status(400).send({message: "name not provided"})
    }
    if(!password)
    {
        return response.status(400).send({message: "password not provided"})
    }
    if(password.length < 3)
    {
        return response.status(400).send({message: "password must be at least 3 characters long"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({username, name,password: hashedPassword});
    const savedUser = await user.save();

    return response.status(201).json(savedUser);
});

userRouter.get('/', async (request, response) => {
    const result = await User.find({});
    return response.json(result);
});

module.exports = userRouter;