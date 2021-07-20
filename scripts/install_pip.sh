#!/bin/bash


sudo apt update
sudo apt install python3-pip
#check version
pip3 --version
#clean
sudo rm /usr/local/opt/python
sudo rm /usr/local/opt/pip

sudo cd /usr/local/opt/
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
sudo ln -s /home/vagrant/.local/bin /usr/local/opt/pip
sudo ln -s "$(which python3)" /usr/local/opt/python


sudo PATH="$PATH/usr/local/opt/pip" 
echo $PATH >> ~/.bashrc 

#source
source ~/.bashrc


