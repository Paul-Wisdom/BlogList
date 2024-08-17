const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config');

const unknownEndPoint = (req, res) => {
    res.status(404).send({error: "Unknown Endpoint"});
}
const errorHandler = (error, req, res, next) => {
    if(error.name === 'CastError'){
        return res.status(400).send({error: "malformed id"});
    }
    if(error.name === 'ValidationError'){
        return res.status(400).send({error: error.message});
    }
    if(error.name === 'JsonWebTokenError'){
        return res.status(401).send({error: error.message});
    }
    next(error);
}

const userExtractor = (req, res, next) => {
    let token = '';
    const authorization = req.get('authorization');
    if(!authorization)
        {
            return res.status(401).send({message: "Invalid Credentials"});
        }
    if (authorization.startsWith('Bearer '))
    {
        token = authorization.replace('Bearer ', '');
    }
    // console.log(token);
    const decodedInfo = jwt.verify(token, secret);
    if(!decodedInfo)
    {
        return res.status(401).send({message: "Invalid Credentials"});
    }
    req.userId = decodedInfo.userId;
    next();

}
module.exports = {
    unknownEndPoint,
    errorHandler,
    userExtractor
}