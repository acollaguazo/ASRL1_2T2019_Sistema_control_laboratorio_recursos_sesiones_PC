
const express = require('express');
const router = express.Router();
const model = require('../model/workstation')();

// Getting Date
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
function FechaActual(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
        
    dd = addZero(dd);
    mm = addZero(mm);

    return hoy = yyyy+'-'+mm+'-'+dd;
}
const date= FechaActual();
const query={date:date}
//console.log(query);
router.get('/',(req,res) => {
    model.find({},(err, data)=>{
        console.log(data)
        if(err) throw err;
        res.render('index',{
            title: 'ASO Session Monitor',
            description: 'Sistema de control de laboratorio, recursos y manejo de sesiones en PC',
            workstations: data
        });
        
    });
});

//Mongo Export
var exec = require('child_process').exec;
var child;
function mongoexport(out_string)
{
        
        child = exec(out_string, function (error, stdout, stderr) 
        {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                        console.log('exec error: ' + error);
                }
        })
        
}
var wk_string = "mongoexport --db=laboratorio --collection=workstations --type=csv --fields=Internet,hostname,ip,date,start_time --out workstations.csv"
var hw_string = "mongoexport --db=laboratorio --collection=hardware --type=csv --fields=nombre,marca,serial,Estado --out hardware.csv"
var hosts_string ="mongoexport --db=laboratorio --collection=hosts --type=csv --fields=nombre,usuarios,IP,Equipos --out hosts.csv"
router.get('/historial',(req,res)=>{
    mongoexport(wk_string);
})
router.get('/Inventario',(req,res)=>{
    mongoexport(hw_string);
})
router.get('/hosts',(req,res)=>{
    mongoexport(hosts_string);
})

//Downloads
router.get('/downloadHistorial/', (req, res) => {
    res.download('./workstations.csv');
  })

router.get('/downloadInventario/', (req, res) => {
    res.download('./hardware.csv');
})
router.get('/downloadHWHosts/', (req, res) => {
    res.download('./hosts.csv');
})

//Shutdown
router.get('/shutdown',(req,res)=>{
    exec('shutdown now', function(error, stdout, stderr){
        callback(stdout)});
})

module.exports = router;