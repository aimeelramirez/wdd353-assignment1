#!/bin/bash
RMPY=`rm get-pip.py`

if test -f get-pip.py;then 
echo 'file exists.' 
echo $RMPY
else 
echo 'file does not exist.' 
fi