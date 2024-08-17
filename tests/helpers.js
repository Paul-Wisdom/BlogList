const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        title: 'Go to blah',
        author: 'Edgar',
        url: 'http://www.dfgjhlkhgh.com',
        likes: 5,
    },
    {
        title: 'to blah',
        author: 'Egar',
        url: 'http://www.dfgjhlkhgh.com',
        likes: 0,
    }
];
const newBlog = {
    title: 'Go to',
    author: 'Ear',
    url: 'http://www.dfgjhlkhgh.com',
    likes: 7,
};
const newBlogWithoutLikes = {
    title: 'Go to',
    author: 'Ear',
    url: 'http://www.dfgjhlkhgh.com',
};
const newBlogWithoutTitle = {
    author: 'Ear',
    url: 'http://www.dfgjhlkhgh.com',
    likes: 7,
};
const newBlogWithoutUrl = {
    title: 'Go to',
    author: 'Ear',
    likes: 7,
};

const blogsInDB = async () => {
    const blogs = await Blog.find({});
    return blogs.map(b => b.toJSON());
};

const missingBlogId = "76aeff2faa05b2d3bdf46a0c";
const malformedBlogId = "76aeff2fa";

const initialUsers = [
    {
        username: "wisdom",
        name: "paul",
        password: "12345678",
    },
    {
        username: "obed",
        name: "king",
        password: "abcdefgh",
    }
];
const userWithoutUserName = {
    name: "mercy",
    password: "12345678",
};
const userWithoutName = {
    username: "Emma",
    password: "12345678",
};
const userWithoutPassword = {
    name: "praise",
    username: "theLaw"
};
const userWithShortPassword = {
    username: "mercy",
    name: "paul",
    password: "gh",
};
const userWithShortUserName = {
    username: "jo",
    name:"mercy",
    password: "234521"
};
const userWithExistingUserName = {
    username: "wisdom",
    name: "loll",
    password: "372jd"
}
const validUser = {
    username: "genevieve",
    name:"mercy",
    password: "234521"
}
const usersInDB = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}
module.exports = {
    initialBlogs,
    newBlog,
    newBlogWithoutLikes,
    newBlogWithoutTitle,
    newBlogWithoutUrl,
    blogsInDB,
    missingBlogId,
    malformedBlogId,
    initialUsers,
    userWithoutName,
    userWithoutUserName,
    userWithoutPassword,
    userWithShortPassword,
    userWithShortUserName,
    userWithExistingUserName,
    validUser,
    usersInDB
}