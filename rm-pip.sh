#!/bin/bash
RMPY=get-pip.py


cleanpy(){
if test -e $RMPY;then 
echo 'File get-pip.py exists.' 
echo rm $RMPY
else 
echo 'File get-pip.py does not exist.' 
fi
} 
cleanpy