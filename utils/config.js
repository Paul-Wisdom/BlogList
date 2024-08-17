require('dotenv').config();

// console.log(process.env.NODE_ENV);
const mongoUrl = process.env.NODE_ENV === 'test'? process.env.TEST_MONGO_URL : process.env.MONGO_URL;
const port = process.env.PORT;
const secret = process.env.JWT_SCR_KEY;

module.exports = {mongoUrl, port, secret};