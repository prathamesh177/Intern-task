const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 60
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16
    },
    address: {
        type: String,
        maxlength: 400,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'store_owner'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
