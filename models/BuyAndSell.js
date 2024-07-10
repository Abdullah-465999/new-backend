const mongoose = require('mongoose');

const BuyAndSellSchema = new mongoose.Schema({
  ChannelName: {
    type: String,
    required: true
  },
  SellNo: {
    type: Number,
    required: true
  },
  PriceUpCheck: {
    type: Number,
    required: true
  },
  SellTokenMultiplier: {
    type: Number,
    required: true
  }
},{collection: 'TokenSellSlots'});

const BuyAndSellModel = mongoose.model('TokenSellSlots', BuyAndSellSchema);

module.exports = BuyAndSellModel;
