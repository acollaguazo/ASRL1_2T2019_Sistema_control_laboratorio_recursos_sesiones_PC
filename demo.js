use laboratorio
db.workstations.insert({Internet: "Connected", hostname: "user", ip: "192.168.100.22 ",date: "2020-01-12", start_time: "10:36"})
db.workstations.find()

db.wkwebs.update({'name':'PC-A'},{$set: {status:"OCUPADO",internet: "Connected", hostname: "user", ip: "192.168.100.22 ",start_time: "10:36"}})
db.wkwebs.find()

