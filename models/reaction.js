const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionID: {
        type: mongoose.SchemaTypes.ObjectId,
        default: new mongoose.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        require: true,
        maxLenght: 280,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
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