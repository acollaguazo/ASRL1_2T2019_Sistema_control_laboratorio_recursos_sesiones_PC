
#! /bin/bash


unset tecreset os architecture kernelrelease internalip externalip nameserver 



# Check if connected to Internet or not
#ping -c 1 google.com &> /dev/null && Status="Connected" || Status="Disconnected"
Status="Connected"

# Check User
userNow=$(who | awk '{print $1}')

# Check Internal IP
internalip=$(hostname -I | awk '{print $1}')

# Check System Uptime
dateuptime=$(who | awk '{print $3}')
start_time=$(who | awk '{print $4}')

#Insert document to DB
echo -e "use laboratorio\ndb.workstations.insert({Internet: \"$Status\", hostname: \"$userNow\", ip: \"$internalip\",date: \"$dateuptime\", start_time: \"$start_time\"})\n" > .in.js
echo -e "db.wkwebs.update({'name':'PC-C'},{\$set: {status:\"Ocupado\",internet: \"$Status\", hostname: \"$userNow\", ip: \"$internalip\",start_time: \"$start_time\"}})\n" >> .in.js
echo -e "db.alarmas.update({'name':'PC-C'},{\$set: {description: \"$userNow has logged on to PC-C\", type: \"info\"}})\n" >> .in.js
#Connection to MongoDB
mongo -u admin -p admin --authenticationDatabase admin 200.126.13.226 < .in.js

# Unset Variables
unset tecreset os architecture kernelrelease internalip externalip nameserver 

echo "SI SE EJECUTO at $(date)" >> inlogs
