const mongoose = require('mongoose');

let db;

module.exports = function connection(){
    if(!db){
        db = mongoose.connect('mongodb://localhost/laboratorio', { useNewUrlParser: true, useUnifiedTopology: true });
        
    }

    return db;
}