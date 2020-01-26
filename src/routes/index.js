
const express = require('express');
const router = express.Router();
const model = require('../model/workstation')();
const alarmas = require('../model/alarmas')();


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
function off(ip){
    console.log('off@'+ip.trim()+'hola')
    const { spawn } = require('child_process');
    const ls = spawn('ssh', ['off@'+ip.trim()]);
    ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    });
    /*ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    });*/
}
router.get('/shutdown/:id', function (req, res) {
    let id = req.params.id;
    model.findById(id,(err,pc)=>{
        if (err) throw err;
        console.log(pc.ip)
        off(pc.ip)
        pc.status="Apagado"
        pc.hostname=" ";
        pc.internet=" ";
        pc.start_time=" ";
        pc.save().then(() => res.redirect('/'))
    })
});

//PowerOFF All
router.get('/offall',function(req,res){
    console.log('Apagando Equipos...')
    model.find({},(err,pc)=>{
        if (err) throw err;
        for(var i = 1; i < pc.length;i++){
            console.log(pc[i].ip)
            off(pc[i].ip)
            pc[i].status="Apagado"
            pc[i].hostname=" ";
            pc[i].internet=" ";
            pc[i].start_time=" ";
            pc[i].save()
        }
        res.redirect('/')
    })
})

//Alarmas
router.get('/alarmas',(req,res)=>{
    alarmas.find({},(err,data)=>{
        res.render('alarmas',{
            title: 'Alarmas',
            alarma: data
            });
    })
})
router.get('/deletAlarma/:id', function (req, res) {
    let id = req.params.id;
    alarmas.findById(id,(err,pc)=>{
        if (err) throw err;
        console.log(pc.ip)
        pc.description=0
        pc.save().then(() => res.redirect('/'))
    })
});

module.exports = router;