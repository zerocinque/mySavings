var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
    date: Date,
    amount: Number,
    description: String,
    category: String,
    dateIns: {type: Date, default: Date.now}
}, {
    collection:'transaction'
});

module.exports = mongoose.model('Transaction', Transaction);