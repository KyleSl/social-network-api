const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    thoughts: [{ 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'thought'
    }],
    friends: [{ 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'user'
    }],
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('user', userSchema);

module.exports = User;