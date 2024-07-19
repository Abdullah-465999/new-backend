const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChannelNameSchema = new Schema({
    ChannelName: {
        type: String,
        required: true,
        unique: true
    }
}, {collection: 'ChannelNames',versionKey:false}) 


const ChannelNameModel = mongoose.model('ChannelName', ChannelNameSchema); 
module.exports = ChannelNameModel;
