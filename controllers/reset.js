const express = require('express')
const Blog = require('../models/blog');
const User = require('../models/user');
const resetRouter = express.Router();

resetRouter.post('/', async (req, res) => {
    await Blog.deleteMany({});
    await User.deleteMany({})
    console.log("emptying test db")
    res.status(204).end()
})

module.exports = resetRouter