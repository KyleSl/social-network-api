const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: email, 
        required: true 
    },
    thoughts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'thought'
    }],
    friends: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }],
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;