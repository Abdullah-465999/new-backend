const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const butterfactoryinfoSchema = new Schema({
    Top_10_Holders: {
        type: String,
        required: true
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
