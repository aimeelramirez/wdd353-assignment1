 #!/bin/sh
 FILE=/etc/resolv.conf
if test -f "$FILE"; then
    echo "$FILE exists."
    sudo rm -rf /etc/resolv.conf
    sudo bash -c 'echo "nameserver 127.0.0.1" >> /etc/resolv.conf'
    sudo bash -c 'echo "nameserver 8.8.8.8" >> /etc/resolv.conf'
    sudo bash -c 'echo "nameserver 8.8.8.4" >> /etc/resolv.conf'
    sudo apt-get update
else 
   echo "$FILE does not exist."
   sudo bash -c 'echo "nameserver 127.0.0.1" >> /etc/resolv.conf'
   sudo bash -c 'echo "nameserver 8.8.8.8" >> /etc/resolv.conf'
   sudo bash -c 'echo "nameserver 8.8.8.4" >> /etc/resolv.conf'
fi




 