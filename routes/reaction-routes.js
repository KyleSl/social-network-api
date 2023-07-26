const router = require('express').Router();
const { Thought } = require('../models');

router.post('/:thoughtID/reactions', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtID, 
            { 
                $addToSet: { reactions: {
                reactionBody: req.body.text,
                user: req.body.userID }}
            }
        );

        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID" });
        }

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:thoughtID/reactions', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtID,
            {
                $pull: { reactions: {
                    reactionID: req.body.reactionID
                }}
            }
        );
        
        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID" });
        }

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;