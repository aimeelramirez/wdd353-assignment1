#!/bin/bash
# CHECKPYRB=true
source check.sh

on_init(){
  local var_ruby=`bash install_rbenv.sh`
  local var_python=`bash install_pip.sh`
  if CHECKPYRB=true; then
    echo "Y" | ${var_ruby}  
  else
    echo "Y" | ${var_python} 
  fi
}

on_init

