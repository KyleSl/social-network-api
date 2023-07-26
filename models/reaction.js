const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionID: {
        type: mongoose.Schema.Types.ObjectId,
        default: new ObjectId,
    },
    reactionBody: {
        type: String,
        require: true,
        maxLenght: 280,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

reactionSchema.methods.getDateCreated = function () {
    return this.createdAt.toString();
}

module.exports = reactionSchema;