
#! /bin/bash


unset tecreset os architecture kernelrelease internalip externalip nameserver 


# Define Variable tecreset
tecreset=$(tput sgr0)

# Check hostname
echo -e '\E[32m'"Hostname :" $tecreset $HOSTNAME

# Check Internal IP
internalip=$(hostname -I)
echo -e '\E[32m'"Internal IP :" $tecreset $internalip

# Check System Uptime
dateuptime=$(who | awk '{print $3}')
end_time=$(who | awk '{print $4}')
echo -e '\E[32m'"System Uptime Days/(HH:MM) :" $tecreset $dateuptime $end_time

#Insert document to DB
echo -e "use laboratorio\ndb.wkwebs.update({'name':'PC-A'},{\$set: {status:\"LIBRE\",internet: \"--\", hostname: \"--\", ip: \"$internalip\",start_time: \"$end_time\"}})\ndb.wkwebs.find()\n" >> out.js
#Connection to MongoDB
mongo < out.js

# Unset Variables
unset tecreset os architecture kernelrelease internalip externalip nameserver 




