const express = require('express');
const sql = require('mssql')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const transInfo = await sql.query`select * from TransInfo`
        res.status(200).json(transInfo.recordset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Status, ChannelName } = req.body;
    try {
        await sql.query`Update TransInfo set Status = ${Status}, ChannelName = ${ChannelName} where ID = ${id}`
        const transInfo = await sql.query`select * from TransInfo where ID = ${id}`
        res.status(200).json(transInfo.recordset[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/manydata', async (req, res) => {
    const dataArray = req.body;
    try {
        dataArray.map(item => sql.query`update TransInfo set Status = 'Archived' where ID=${item}`)

        const updatedTransInfo = await sql.query`select * from TransInfo`

        res.status(200).json({
            message: 'Status updated for all specified transactions',
            updatedTransInfo: updatedTransInfo.recordset
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
