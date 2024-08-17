const express = require('express');
const blogRouter = express.Router();

const Blog = require('../models/blog');
const { userExtractor} = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('userId');
    return response.json(blogs);
});
  
blogRouter.post('/', userExtractor, async (request, response) => {
    if(!request.body.likes)
    {
        request.body.likes = 0;
    }
    if(!request.body.title || !request.body.url)
    {
        return response.status(400).send({message: "No title and/or url provided"})
    }
    const blog = new Blog({url: request.body.url, title: request.body.title, likes: request.body.likes, author: request.body.author,userId: request.userId})
    const result = await blog.save();
    return response.status(201).json(result)
})


//deleting blogs
blogRouter.delete('/:blogId', userExtractor, async (request, response, next) => {
    const id = request.params.blogId;
    const userId = request.userId;
    const result = await Blog.findOneAndDelete({_id: id, userId: userId});
    if(!result)
    {
        return response.status(401).send({message: "User does not have access to this blog"})
    }
    return response.status(204).end();
})
//updating blogs likes
blogRouter.put('/:blogId',userExtractor, async (request, response) => {
    const id = request.params.blogId;
    const userId = request.userId
    if(!request.body.likes)
    {
        request.body.likes = 0;
    }
    const newLikes = request.body.likes;
    const result = await Blog.findOneAndUpdate({_id: id, userId: userId}, {likes: newLikes}, {new: true, runValidators: true, context: 'query'})
    // const result = await Blog.findByIdAndUpdate(id, {likes: newLikes}, {new: true, runValidators: true, context: 'query'});
    if(!result)
    {
        return response.status(401).send({message: "User does not have access to this blog"});
    }
    return response.status(200).json(result);
})

module.exports = blogRouter;