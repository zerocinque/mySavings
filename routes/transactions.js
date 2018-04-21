var express = require('express');
var router = express.Router();
var Transaction = require('../models/Transaction');
const EventEmitter = require('events');

/* GET users listing. */
router.get('/', function(req, res, next) {
    Transaction.find(function (err, transactions) {
        res.render('transactions', {title: 'Transactions',transactions: transactions});
    });
});

module.exports = router;
