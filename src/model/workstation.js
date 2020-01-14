module.exports = function() {


    var db = require('../libs/connection-db')();
    var mongoose = require('mongoose');

    var wk = mongoose.Schema({
        name: String,
        status: String,
        ip: String,
        hostname: String,
        start_time: String,
        internet: String
    })

    return mongoose.model('wkwebs',wk);

}