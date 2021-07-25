#!/bin/bash
RMPY="$PWD/get-pip.py"
RMPYVM="/var/www/html/get-pip.py"

CHECKPY="$PWD/get-pip.py"


cleanpy(){
if test -e $RMPY;then 
echo 'File get-pip.py local exists.' 
sudo  rm $RMPY 
else 
echo 'File get-pip.py local does not exist.' 
fi

} 



cleanpyvm(){
if  test -e $CHECKPY;then 
echo 'File get-pip.py vm exists.' 
sudo rm $PWD/get-pip.py
else 
echo 'File get-pip.py vm does not exist.' 
fi
}
cleanpyvm
cleanpy

