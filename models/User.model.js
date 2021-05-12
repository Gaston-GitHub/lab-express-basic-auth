// User model here
const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required.'],
            unique: true

        }
    },
    {
        passwordHash: {
            type: String,
            required: [true, 'Password is required']
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema)

module.exports = User;