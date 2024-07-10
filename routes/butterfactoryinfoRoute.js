const express = require('express');
const router = express.Router();
const butterfactoryinfoModel = require('../models/ButterFactory')


router.get('/',async(req,res)=>{

    try {
        const response = await butterfactoryinfoModel.find({});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error});
    }
})


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
        const transInfo = await butterfactoryinfoModel.findByIdAndUpdate(id,newData, { new: true });
        res.status(200).json(transInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;