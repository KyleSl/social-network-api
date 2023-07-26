const db = require('../config/connection');
const { User, Thought } = require('../models');

db.once('open', async () => {
    console.log('connected to ' + db.name);
    const smeltedbutter = await seedUsers();

    await seedThoughts(smeltedbutter);

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
    return User.findOne({ username: 'smeltedbutter' });
}

async function seedThoughts (smeltedbutter) {
    const thoughtSeeds = [{
        thoughtText: 'this is cool',
        user: smeltedbutter._id
    }, {
        thoughtText: 'I love mongoose',
        user: smeltedbutter._id
    }];
    await Thought.create(thoughtSeeds);
    console.log('seeded thoughts with user ' + smeltedbutter._id);
}