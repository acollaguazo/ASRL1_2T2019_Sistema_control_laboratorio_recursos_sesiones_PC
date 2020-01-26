const express = require('express');
const logger = require('morgan');
const parse = require('body-parser');
const routes = require('./routes/index')
const path  = require('path');
const app = express();

// configuration
app.set('port',process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// MW
app.use(logger('dev'));
app.use(parse.urlencoded({extended: false}));


//views
app.use('/',routes)
app.use('/downloadHistorial',routes)
app.use('/historial',routes)
app.use('/downloadInventario',routes)
app.use('/Inventario',routes)
app.use('/downloadHWHosts',routes)
app.use('/hosts',routes)
app.use('/shutdown',routes)
app.use('/offall',routes)
app.use('/alarmas',routes)
app.use('/deletAlarma',routes)


app.listen(app.get('port'),() =>{
    
    console.log(' port:') 
    app.get('port')
})