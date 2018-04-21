var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
    id: Schema.Types.ObjectId,
    date: Date,
    amount: Number,
    description: String,
    category: String,
    dateIns: {type: Date, default: Date.now}
}, {
    collection:'category'
});

module.exports = mongoose.model('Transaction', Transaction);