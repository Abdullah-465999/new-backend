const express = require('express')
const router = express.Router()
const transWalletInfo = require('../models/TransWalletInfo');


router.get('/', async (req, res) => {
    try {
        const walletInfo = await transWalletInfo.find({})
        res.status(200).json(walletInfo)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    const transaction = req.body
    console.log(req.body);
    try {
        const newTrans = await  transWalletInfo.create(transaction);
        res.status(200).json(newTrans);

    } catch (error) {
        res.status(500).json({ error })
    }
    
})
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    console.log(newData);
    try {
        const updatedTransaction = await transWalletInfo.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).json(updatedTransaction);
        
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({error});
    }
})

router.post('/manydata', async (req, res) => {
    try {
        const dataArray = req.body; 
        const insertedData = await transWalletInfo.insertMany(dataArray);
        res.status(200).json(insertedData);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router