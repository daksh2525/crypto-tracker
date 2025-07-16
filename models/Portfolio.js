const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  amount: Number
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
