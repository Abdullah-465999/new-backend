const mongoose = require('mongoose');

const transInfoSchema = new mongoose.Schema({
    TransAddress: String,
    TransInputAddress: String,
    TransInputAmount: Number,
    TransOutputAddress: String,
    TransOutputAmount: Number,
    Type: String,
    InputCurrency: String,
    OutputCurrency: String,
    BuyTxID: String,
    Status: String,
    CreatedDate: String,
    SellSlotNo: Number,
    ChannelName: String,
    Sell1TxID: String,
    Sell2TxID: String,
    Sell3TxID: String,
    Sell4TxID: String,
    Sell5TxID: String
}, { collection: 'TransInfo' }); // Specify the collection name

const TransInfo = mongoose.model('Transinfo', transInfoSchema);

module.exports = TransInfo;
