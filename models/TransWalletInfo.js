    const mongoose = require('mongoose');

    const transWalletInfoSchema = new mongoose.Schema({
        WalletPrivateAddress: String,
        TransAddress: String,
        TransAmount: Number,
        SolanaNetwork: String,
        SlipagePercentage: Number,
        ParseTransactionURL: String,
        ChannelName: String,
        TotalNoOfSells: Number,
        SupertrendSelling: Boolean,
        PriceTrackingFrequency: Number,
        IsJitoTrans: Boolean
    }, { collection: 'TransWalletInfo', versionKey: false });

    const TransWalletInfo = mongoose.model('TransWalletInfo', transWalletInfoSchema);

    module.exports = TransWalletInfo;
