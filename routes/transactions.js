var express = require('express');
var router = express.Router();
var Transaction = require('../models/Transaction');
var date = require('../src/dateFormat');

/* GET transactions listing. */
router.get('/', function(req, res, next) {
    Transaction.find(function (err, transactions) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        transactions.forEach(function (t) {
            t.viewDate = t.date.toLocaleDateString('en-GB', options);
            t.viewNext = t.next ? t.next.toLocaleString('en-GB', options) : "";
        });
        res.render('transactions', {title: 'Transactions',transactions: transactions});
    });
});

/* GET new transaction form. */
router.get('/add', function (req, res, next) {
    res.render('transactionForm', {title: "New transaction", action: "Add"});
});

/* POST new transaction. */
router.post('/add', function(req, res, next) {
    var transaction = new Transaction(req.body);
    transaction.save().then(function () {
        res.redirect('/transactions');
    }).catch(function (err) {
        res.status(400).render('error', err);
    });
});

/* GET edit transaction form. */
router.get('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    Transaction.findById(id, function (err, transaction){
        if(err)
            res.status(404).render('error', err);

        transaction.nDate = date.ISOFormat(transaction.date);
        transaction.nNext = transaction.next ? date.ISOFormat(transaction.next) : null;
        res.render('transactionForm', {title: "Edit transaction", transaction: transaction, action: "Edit"});
    });
});

/* PUT edit transaction. */
router.post('/edit/:id', function(req, res, next) {
    var id = req.params.id;
    Transaction.findById(id, function (err, transaction){
        if(!transaction || err)
            res.status(404).render('error', err);

        transaction.amount = req.body.amount;
        transaction.description = req.body.description;
        transaction.category = req.body.category;
        transaction.next = req.body.next;
        transaction.date = req.body.date;

        transaction.save().then(function () {
            res.redirect('/transactions');
        }).catch(function (e) {
            res.status(400).render('error', e);
        });
    });
});

/* DELETE transaction */
router.delete('/delete/:id', function (req, res) {
    Transaction.findByIdAndRemove( {_id: req.params.id}, function (err) {
        if (err)
            res.status(500).json({error: err});
        else
            res.status(200).json();
    });
});

module.exports = router;
