const router = require('express').Router();
const { User, Thought } = require('../models');

// /api/user

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User({ username: req.body.username, email: req.body.email });
        newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                username: req.body.username,
                email: req.body.email
            }
        );

        if (!user) {
            return res.status(404).json({ message: "No user with that ID" });
        }

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete one user by ID
router.delete('/id/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: "No user with that ID" });
        }

        await Thought.deleteMany({ user: user._id });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

// add a friend by ID to a user by ID
router.post('/addfriend', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.body.userID, 
            { $addToSet: { friends: req.body.friendID }}
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// remove a friend by ID from a user by ID
router.delete('/removefriend', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.body.userID, 
            { $pull: { friends: req.body.friendID } }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;