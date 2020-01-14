use laboratorio
db.workstations.insert({Internet: "Disconnected", hostname: "user", ip: "192.168.178.81 ",date: "2020-01-13", start_time: "13:50"})
db.workstations.find()

db.wkwebs.update({'name':'PC-A'},{$set: {status:"OCUPADO",internet: "Disconnected", hostname: "user", ip: "192.168.178.81 ",start_time: "13:50"}})
db.wkwebs.find()

