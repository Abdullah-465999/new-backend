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
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const updatedTransaction = await transWalletInfo.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({error});
    }
})

module.exports = router