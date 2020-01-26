#!/bin/sh

#Install dependencies for python
apt install python-pip 
pip install pymongo

#Install Scrips files
cp .log_in.sh /home/estudiante/
cp .log_in.sh /home/off/
chmod 777 /home/estudiante/.log_in.sh
chmod 777 /home/off/.log_in.sh
cp mongo.py /bin/
cp device_removed.sh /bin/
chmod 777 /bin/device_removed.sh
cp 80-test.rules /etc/udev/rules.d/
udevadm control --reload

#Modify OS files
cat  log_out.sh > /etc/gdm3/PostSession/Default
echo "./.log_in.sh" >> /etc/profile
echo "@reboot root    /usr/bin/env python /bin/mongo.py" >> /etc/crontab

