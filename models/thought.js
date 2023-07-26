const mongoose = require('mongoose');
const Reaction = require('./reaction');

const thoughtSchema = new mongoose.Schema({
    thoughtText: { 
        type: String, 
        require: true, 
        maxLength: 280,
        minLength: 1,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    reactions: [Reaction],
});

thoughtSchema.methods.getDateCreated = function () {
    return this.createdAt.toString();
}

const Thought = model('thought', thoughtSchema);

module.exports = Thought;