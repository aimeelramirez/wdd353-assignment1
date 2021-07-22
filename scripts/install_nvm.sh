#!/bin/bash

 blue="\e[0;94m"
  reset="\e[0m" 
  cd /home/vagrant
  # Installing nvm
  wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh

  # make a copy to usr/local to read it without .
  FILE_OPT=/usr/local/opt
   run_install(){
      echo "${blue}configuring nvm"
    #delete if exists
    sudo rm -rf  /usr/local/opt/nvm
    echo $FILE_OPT
    (cd $FILE_OPT;   echo "${blue}I'm now in $PWD"  )
    sudo PATH_NVM=$PATH bash -c "cp -r /home/vagrant/.nvm  /usr/local/opt/nvm "
    echo $PATH_NVM
    sudo PATH_NL=$PATH bash -c "cd /var/www/html; sudo bash scripts/nameserver.sh && echo 'Running nameserver'"
    echo $PATH_NL
    # check
    sudo PATH=$PATH bash -c "which node npm pnpm"
    echo $PATH

    #create the dir to point to local dir
    export NVM_DIR="/home/vagrant/.nvm"
      [ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
      [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"

 
    # source where nvm
    sudo SOURCE_NVM=$PATH bash -c "source ~/.bashrc && source /usr/local/opt/nvm/nvm.sh && echo 'configuring source'" 
    echo $SOURCE_NVM
    # Install a node, ruby, python, and alias
     if command -v node; then
          echo "${blue}Node exists!${reset}" 
    else
          echo "${blue}node does not exist so installing it now${reset}" 
        # nvm install 0.10.33
        # nvm alias default 0.10.33
        nvm install node
        nvm use node
    fi
    if command -v rbenv; then
          echo "${blue}Ruby exists!${reset}"
    else
        echo "${blue}ruby does not exist so installing it now${reset}" 
       sudo PATH_RUBY=$PATH bash -c "cd /var/www/html;    echo "${blue}Y" | bash scripts/install_rbenv.sh && echo 'Running Ruby Manager installs.'"
       echo $PATH_RUBY
    fi
      if command -v pip; then
          echo "${blue}Python exists!${reset}"
      else
        echo "${blue}python does not exist so installing it now${reset}" 
        sudo PATH_PY=$PATH bash -c "cd /var/www/html; bash scripts/install_pip.sh && echo 'Running Python Manager installs.'"
        echo $PATH_PY
      fi
       
    }
 if test -d $FILE_OPT; then
    run_install
   else 
    # create the dir if not existing
      echo "${blue}file does not exist${reset}"
    sudo mkdir /usr/local/opt/
    run_install
  fi

