#!/bin/sh
unset tecreset os architecture kernelrelease internalip externalip nameserver 
# Check Internal IP
internalip=$(hostname -I | awk '{print $1}')

# Check System Uptime
end_time=$(who | awk '{print $4}')

# Check User
userNow=$(who | awk '{print $1}')

#Insert document to DB
printf "use laboratorio\n" > .out.js
printf "db.wkwebs.update({'name':'PC-C'},{\$set: {status:\"Libre\",internet: \"--\", hostname: \"--\", ip: \"$internalip\",start_time: \"$end_time\"}})\n" >> .out.js
printf "db.alarmas.update({'name':'PC-C'},{\$set: {description: \"$userNow has closed on to PC-C\", type: \"info\"}})\n" >> .out.js
#Connection to MongoDB
mongo -u admin -p admin --authenticationDatabase admin 200.126.13.226 < .out.js

# Unset Variables
unset tecreset os architecture kernelrelease internalip externalip nameserver 
exit 0
