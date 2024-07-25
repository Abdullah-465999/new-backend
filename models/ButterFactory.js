const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const butterfactoryinfoSchema = new Schema({
    Price: {
        type: Number,
        default: null
    },
    Liquidity: {
        type: Number,
        default: null
    },
    Locked: {
        type: Number,
        default: null
    },
    Total_Volume: {
        type: Number,
        default: null
    },
    Buy_Volume: {
        type: Number,
        default: null
    },
    Sell_Volume: {
        type: Number,
        default: null
    },
    Net_Volume: {
        type: Number,
        default: null
    },
    Traders_Count: {
        type: Number,
        default: null
    },
    Trades_Count: {
        type: Number,
        default: null
    },
    Buy_Count: {
        type: Number,
        default: null
    },
    Top_10_Holders: {
        type: String,
        required: true
    },
    Marketcap: {
        type: Number,
        default: null
    },
    Circulating: {
        type: Number,
        default: null
    },
    Mintable: {
        type: Number,
        default: null
    },
    Mutable: {
        type: Number,
        default: null
    },
    Contract_Address: {
        type: String,
        required: true
    },
    DexTools_link: {
        type: String,
        required: true
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    Supply: {
        type: Number,
        required: true
    },
    launch_marketcap: {
        type: String,
        required: true
    },
    Current_marketcap: {
        type: String,
        required: true
    },
    Initial_lp: {
        type: String,
        required: true
    },
    Lp_tokens: {
        type: String,
        required: true
    },
    Top_hodlers: {
        type: Number,
        default: null
    },
    Volume_24h: {
        type: Number,
        default: null
    },
    Transactions_24h: {
        type: Number,
        default: null
    },
    Airdrops: {
        type: Number,
        default: null
    },
    Mint: {
        type: String,
        required: true
    },
    Lp_status: {
        type: String,
        required: true
    },
    ChannelName: {
        type: String,
        required: true
    }
},{collection: 'BuyingInfo'});

// Create model
const butterfactoryinfoModel = mongoose.model('BuyingInfo', butterfactoryinfoSchema);

module.exports = butterfactoryinfoModel;
