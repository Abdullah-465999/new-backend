const express = require('express');
const TransInfo = require('../models/TransInfo');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const transInfo = await TransInfo.find({});
        res.status(200).json(transInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Status } = req.body;
    try {
        const transInfo = await TransInfo.findByIdAndUpdate(id, { Status }, { new: true });
        res.status(200).json(transInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/manydata', async (req, res) => {
    try {
        const dataArray = req.body; // assuming dataArray is an array of IDs
        await TransInfo.updateMany(
            { _id: { $in: dataArray } },
            { $set: { Status: "Archived" } }
        );
        
        // Fetch the updated documents
        const updatedTransInfo = await TransInfo.find({ });

        res.status(200).json({ message: 'Status updated for all specified transactions', updatedTransInfo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
