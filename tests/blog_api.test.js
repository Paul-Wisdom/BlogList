const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./helpers');
const {secret} = require('../utils/config');

const api = supertest(app);

let token, unauthorizedToken , loggedUser;
const invalidToken = "anInvalidToken";

beforeAll(async () => {
    await User.deleteMany({});
    const user = new User(helper.initialUsers[0]);
    const savedUser = await user.save();
    loggedUser = savedUser;
    const anotherUser = new User(helper.validUser);
    const savedAnotherUser = await anotherUser.save(); 
    token = jwt.sign({username: savedUser.username, userId: savedUser._id},secret,{expiresIn: '10m'});
    unauthorizedToken = jwt.sign({username: savedAnotherUser.username, userId: savedAnotherUser._id},secret,{expiresIn: '10m'})
})
beforeEach(async() => {
    await Blog.deleteMany({});
    const BlogObjects = helper.initialBlogs.map(blog => {
       return new Blog({... blog, userId: loggedUser._id});
    });
    const BlogPromises = BlogObjects.map(blog => {
      return blog.save();
    })
    await Promise.all(BlogPromises);
});

describe('Getting blogs', () => {
    test('should return the correct number of blogs in JSON format', async () => {
        const response = await api.get(`/api/blogs`).expect('Content-Type', /application\/json/);
        expect(response.body).toHaveLength(helper.initialBlogs.length);
    })
    test('unique identifier id should be defined', async () => {
        const response = await api.get(`/api/blogs`);
        expect(response.body[0].id).toBeDefined();
    });    
})

describe('creating blogs', () => {
    test('returns 401 status code for invalid token', async() => {
        const response = await api.post('/api/blogs').send(helper.newBlog).set('authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(401);
    });
    test('returns 401 status code for no token', async() => {
        const response = await api.post('/api/blogs').send(helper.newBlog);
        expect(response.status).toBe(401);
    });
    test('post /api/blogs works with all fields', async() => {
        const response = await api.post('/api/blogs').send(helper.newBlog).set('authorization', `Bearer ${token}`);
        const blogsAtEnd = await helper.blogsInDB();
        const transformedBlogs = blogsAtEnd.map(blog => {
            return {author: blog.author, likes: blog.likes, title: blog.title, url: blog.url}
        })
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
        expect(transformedBlogs).toContainEqual(helper.newBlog);
        expect(response.status).toBe(201);
    });
    test('default number of likes for new blogs is zero', async() => {
        const response = await api.post('/api/blogs').send(helper.newBlogWithoutLikes).set('authorization', `Bearer ${token}`);
        expect(response.body.likes).toBe(0);
        expect(response.status).toBe(201);
    });
    test('creating blogs without title returns 400 status code', async () => {
        const response = await api.post('/api/blogs').send(helper.newBlogWithoutTitle).set('authorization', `Bearer ${token}`);
        const blogsAtEnd = await helper.blogsInDB();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
        expect(response.status).toBe(400);
    });
    test('creating blogs without url returns 400 status code', async () => {
        const response = await api.post('/api/blogs').send(helper.newBlogWithoutUrl).set('authorization', `Bearer ${token}`);
        const blogsAtEnd = await helper.blogsInDB();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
        expect(response.status).toBe(400);
    });
    
})
describe('editting blogs', () => {
    test("with malformed Id should return 400 status with malformed id error", async() => {
        const body = {likes: 2}
        const response = await api.put(`/api/blogs/${helper.malformedBlogId}`).send(body).set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({error: "malformed id"});
    });
    test("with missing BlogId should return 401 status with access error", async() => {
        const body = {likes: 2}
        const response = await api.put(`/api/blogs/${helper.missingBlogId}`).send(body).set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual({message: "User does not have access to this blog"});
    });
    test("with unauthorized token i.e user is not the creator of the blog should return 401 status with access error", async() => {
        const blog = await helper.blogsInDB();
        const blogId = blog[0].id;
        const body = {likes: 2}
        const response = await api.put(`/api/blogs/${blogId}`).send(body).set('authorization', `Bearer ${unauthorizedToken}`);
        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual({message: "User does not have access to this blog"});
    });
    test('returns 401 status code for invalid token', async() => {
        const body = {likes: 2}
        const blog = await helper.blogsInDB();
        const blogId = blog[0].id;
        const response = await api.put(`/api/blogs/${blogId}`).send(body).set('authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(401);
    });
    test('returns 401 status code for no token', async() => {
        const body = {likes: 2}
        const blog = await helper.blogsInDB();
        const blogId = blog[0].id;
        const response = await api.put(`/api/blogs/${blogId}`).send(body);
        expect(response.status).toBe(401);
    });
    test("with valid but no likes field Id should return 200 status with likes updated to 0", async() => {
        const blog = await helper.blogsInDB();
        const blogId = blog[0].id;
        const response = await api.put(`/api/blogs/${blogId}`).set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.likes).toBe(0);
    });
    test("with valid Id and likes field should return 200 status with updated number of likes", async() => {
        const body = {likes: 2}
        const blog = await helper.blogsInDB();
        const blogId = blog[0].id;
        const response = await api.put(`/api/blogs/${blogId}`).send(body).set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.likes).toBe(body.likes);
    });
})
describe("Deleting blogs", () => {
    test("with malformed Id should return 400 status with malformed id error", async() => {
        const blogsAtStart = await helper.blogsInDB();
        const response = await api.delete(`/api/blogs/${helper.malformedBlogId}`).set('authorization', `Bearer ${token}`);
        const blogsAtEnd = await helper.blogsInDB();
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({error: "malformed id"});
        expect(blogsAtEnd.length).toBe(blogsAtStart.length);
    });
    test("with unauthorized token should return 401 status", async() => {
        const blogsAtStart = await helper.blogsInDB();
        const blogId = blogsAtStart[0].id;
        const response = await api.delete(`/api/blogs/${blogId}`).set('authorization', `Bearer ${unauthorizedToken}`);
        const blogsAtEnd = await helper.blogsInDB();
        expect(response.status).toBe(401);
        expect(blogsAtEnd.length).toBe(blogsAtStart.length );
    });
    test('returns 401 status code for invalid token', async() => {
        const blogsAtStart = await helper.blogsInDB();
        const blogId = blogsAtStart[0].id;
        const response = await api.delete(`/api/blogs/${blogId}`).send(helper.newBlog).set('authorization', `Bearer ${invalidToken}`);
        const blogsAtEnd = await helper.blogsInDB();
        expect(response.status).toBe(401);
        expect(blogsAtEnd.length).toBe(blogsAtStart.length );
    });
    test('returns 401 status code for no token', async() => {
        const blogsAtStart = await helper.blogsInDB();
        const blogId = blogsAtStart[0].id;
        const response = await api.delete(`/api/blogs/${blogId}`).send(helper.newBlog);
        const blogsAtEnd = await helper.blogsInDB();
        expect(response.status).toBe(401);
        expect(blogsAtEnd.length).toBe(blogsAtStart.length );
    });
    test("with valid Id should return 204 status", async() => {
        const blogsAtStart = await helper.blogsInDB();
        const blogId = blogsAtStart[0].id;
        const response = await api.delete(`/api/blogs/${blogId}`).set('authorization', `Bearer ${token}`);
        const blogsAtEnd = await helper.blogsInDB();
        expect(response.status).toBe(204);
        expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);
    });
})
afterAll(async() => {
    await mongoose.connection.close();
})