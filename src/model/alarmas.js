module.exports = function() {


    var db = require('../libs/connection-db')();
    var mongoose = require('mongoose');

    var alarma = mongoose.Schema({
        name: String,
        description: String,
        type: String
    })

    return mongoose.model('alarmas',alarma);

}