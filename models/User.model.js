// User model here
const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');

const userSchema = new Schema({

        username: String,
        email: {
            type: String,
            unique: true,
        },
        hashedPassword: {
            type: String,
            require: [true, 'password is required'],
        },


    });

const User = mongoose.model('User', userSchema)

module.exports = User;