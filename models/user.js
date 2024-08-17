const mongoose = require('mongoose');
const uniqieValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

userSchema.plugin(uniqieValidator);
userSchema.set('toJSON', {
    transform:(document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.password;
      }
})

const User = mongoose.model('User', userSchema);
module.exports = User; 