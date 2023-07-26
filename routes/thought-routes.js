const router = require('express').Router();
const { User, Thought } = require('../models');

// get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = Thought.find({});
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one thought by ID
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// post a new thought
router.post('/', async (req, res) => {
    try {
        const newThought = new Thought({
            thoughtText: req.body.text,
            user: req.body.userID,
        });
        newThought.save();

        await User.findByIdAndUpdate(
            req.body.userID,
            { $addToSet: { thoughts: newThought._id }}
        );

        res.status(200).json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        
        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID" });
        }

        await User.findByIdAndUpdate(
            thought.user,
            { $pull: { thoughts: thought._id }}
        );

        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.id,
            { thoughtText: req.body.text });

        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID" });
        }

        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;