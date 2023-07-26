const db = require('../config/connection');
const { User, Thought } = require('../models');

db.once('open', async () => {
    console.log('connected to db');
    await seedUsers();

    // const smeltedbutter = await User.find({ username: 'smeltedbutter' });
    // seedThoughts(smeltedbutter._id);

    process.exit(0);
});

async function seedUsers () {
    const userSeeds = [{
        username: 'smeltedbutter',
        email: 'kyleslaughter8@gmail.com'
    }, {
        username: 'gamergod88',
        email: 'gaming@gmail.com'
    }];
    await User.create(userSeeds);
    console.log('seeded users');
}

function seedThoughts (smeltedbutterID) {
    const thoughtSeeds = [{
        thoughtText: 'this is cool',
        user: smeltedbutterID
    }, {
        thoughtText: 'I love mongoose',
        user: smeltedbutterID
    }];
    Thought.create(thoughtSeeds);
}