var mongoose = require('mongoose');
require('dotenv').load();

var connectionString = process.env.CONNECTIONSTRING;

module.exports.connect = () => { 
    return new Promise((resolve, reject) => { 
        mongoose.connect(connectionString).then(function() {
            console.log('connected to db');
            resolve();
        }).catch (function(err){
            console.error('App starting error:', err.stack);
            reject();
        });
    });
}

module.exports.close = () => {
    mongoose.connection.close();
}