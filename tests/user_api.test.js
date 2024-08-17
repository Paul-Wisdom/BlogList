const supertest = require('supertest');
const mongoose = require('mongoose');

const helper = require('./helpers');
const User = require('../models/user');
const app = require('../app');
const api = supertest(app);

beforeEach(async() => {
    await User.deleteMany({});
    const userObjects = helper.initialUsers.map(u => new User(u));
    const userPromise = userObjects.map(user =>  user.save());
    await Promise.all(userPromise)
});

describe("creating new users", () => {
    test("without username", async() => {
        const usersAtStart = await helper.usersInDB();
        const response = await api.post('/api/users').send(helper.userWithoutUserName);
        const usersAtEnd = await helper.usersInDB();

        expect(response.status).toBe(400);
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
    test("with short username", async() => {
        const usersAtStart = await helper.usersInDB();
        const response = await api.post('/api/users').send(helper.userWithShortUserName);
        const usersAtEnd = await helper.usersInDB();

        expect(response.status).toBe(400);
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
    test("without name", async() => {
        const usersAtStart = await helper.usersInDB();
        const response = await api.post('/api/users').send(helper.userWithoutName);
        const usersAtEnd = await helper.usersInDB();

        expect(response.status).toBe(400);
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
    test("without password", async() => {
        const usersAtStart = await helper.usersInDB();
        const response = await api.post('/api/users').send(helper.userWithoutPassword);
        const usersAtEnd = await helper.usersInDB();

        expect(response.status).toBe(400);
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
    test("with short password", async() => {
        const usersAtStart = await helper.usersInDB();
        const response = await api.post('/api/users').send(helper.userWithShortPassword);
        const usersAtEnd = await helper.usersInDB();

        expect(response.status).toBe(400);
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
    test("with existing username", async() => {
        const usersAtStart = await helper.usersInDB();
        const response = await api.post('/api/users').send(helper.userWithExistingUserName);
        const usersAtEnd = await helper.usersInDB();

        expect(response.status).toBe(400);
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
    test("with valid details", async() => {
        const usersAtStart = await helper.usersInDB();
        const response = await api.post('/api/users').send(helper.validUser);
        const usersAtEnd = await helper.usersInDB();

        expect(response.status).toBe(201);
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);
    });
})
afterAll(async() => {
    await mongoose.connection.close();
})