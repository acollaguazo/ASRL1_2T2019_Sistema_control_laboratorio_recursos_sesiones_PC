
#! /bin/bash


unset tecreset os architecture kernelrelease internalip externalip nameserver 


# Define Variable tecreset
tecreset=$(tput sgr0)

# Check if connected to Internet or not
ping -c 1 google.com &> /dev/null && Status="Connected" || Status="Disconnected"
echo -e '\E[32m'"Internet: $tecreset $Status"


# Check hostname
echo -e '\E[32m'"Hostname :" $tecreset $HOSTNAME

# Check Internal IP
internalip=$(hostname -I)
echo -e '\E[32m'"Internal IP :" $tecreset $internalip

# Check System Uptime
dateuptime=$(who | awk '{print $3}')
start_time=$(who | awk '{print $4}')
echo -e '\E[32m'"System Uptime Days/(HH:MM) :" $tecreset $dateuptime $start_time

#Insert document to DB
echo -e "use laboratorio\ndb.workstations.insert({Internet: \"$Status\", hostname: \"$HOSTNAME\", ip: \"$internalip\",date: \"$dateuptime\", start_time: \"$start_time\"})\ndb.workstations.find()\n" > in.js
echo -e "db.wkwebs.update({'name':'PC-A'},{\$set: {status:\"OCUPADO\",internet: \"$Status\", hostname: \"$HOSTNAME\", ip: \"$internalip\",start_time: \"$start_time\"}})\ndb.wkwebs.find()\n" >> in.js
#Connection to MongoDB
mongo < in.js

# Unset Variables
unset tecreset os architecture kernelrelease internalip externalip nameserver 




