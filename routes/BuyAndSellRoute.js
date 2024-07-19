const express = require('express')
const router = express.Router()
const BuyAndSellModel = require('../models/BuyAndSell')
const ChannelNameModel = require('../models/ChannelNames')

router.get('/', async (req, res) => {
    try {
        const walletInfo = await BuyAndSellModel.find({})
        res.status(200).json(walletInfo)
    } catch (error) {
        res.status(500).json({ error })
    }
})
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const updatedTransaction = await BuyAndSellModel.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error });
    }
})




router.post('/manydata', async (req, res) => {
    try {
        console.log('idhr arha hai');
        const dataArray = req.body.map(({ _id, ...rest }) => rest);
        const addedData = await BuyAndSellModel.insertMany(dataArray)
        console.log(addedData);
        res.status(201).json(addedData)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/dlt/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        if (!id) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const deleteResult = await BuyAndSellModel.deleteOne({ _id: id });
        console.log(deleteResult);

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const users = await BuyAndSellModel.find();

        res.status(200).json({ message: 'User deleted successfully', users });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/channelname', async (req, res) => {
    try {
        const channelNames = await ChannelNameModel.find({});
        res.status(200).json(channelNames);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.put('/channel/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const channel = await ChannelNameModel.findByIdAndUpdate(id, req.body, { new: true });
        const channelNames = await ChannelNameModel.find({});
        console.log(channelNames);
        res.status(200).json(channelNames);

    } catch (error) {

        res.status(500).json({ error: error });
    }
})

router.post('/channel', async (req, res) => {
    try {
    const newChannel = req.body     
    const newChannelName = await ChannelNameModel.create(newChannel)  
    const allNames = await ChannelNameModel.find({});
    res.status(200).json(allNames);
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router