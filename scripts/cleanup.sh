#!/bin/bash

FIND_MACHINE='.vagrant/machines'

cleanup(){
if  test -d $FIND_MACHINE;then
    echo "cleaning up... please wait!"
    rm -rf .vagrant/machines
    sh rm-pip.sh
    cleanup
else
    echo "All clean! Ready for new machine."
fi
}

vagrant halt
cleanup