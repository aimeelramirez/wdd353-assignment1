#!/bin/bash
#https://github.com/rbenv/rbenv
#installing Ruby version management tool 
blue="\e[0;94m"
reset="\e[0m"

is_processed(){
     sudo apt-get install rbenv
      eval "$(rbenv init -)"
      echo 'eval "$(rbenv init -)"' >> ~/.bashrc
      echo "This is logged user: "$USER 

       #https://github.com/rbenv/ruby-build
   
   if command -v ruby-build && $USER != 'root';then
    echo "ruby-build exists"
   else
    echo "ruby-build does not exists"

    sudo git clone https://github.com/rbenv/ruby-build.git
    sudo PREFIX=/usr/local ./ruby-build/install.sh
   # git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
   # sudo sh ~/.rbenv/plugins/ruby-build/install.sh
  fi
    ## Get the most stable 
    
if  test -d  /home/vagrant/.rbenv/versions/3.0.2;then
    echo "rbenv exists"
     rbenv install -l | grep -v - | tail -1
    # echo  ~/.rbenv/bin/rbenv init
    # curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
    #check rbenv repl and ruby
    echo "where is the repl:"
    rbenv which irb
    echo "List installed versions:"
    rbenv versions
    echo "where is the ruby and version dir:"
    rbenv which ruby
    #update ruby set
    sudo rm /usr/bin/ruby
    sudo ln -s "$(rbenv which ruby)" /usr/bin/ruby
    # echo $PATH_BRC
    curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
   #source
   . ~/.bashrc

   else
    echo "rbenv does not exists"
     rbenv install -l | grep -v - | tail -1

    echo "${blue}This might take a bit. Please wait.....${reset}"

     rbenv install 3.0.2
    # set  ruby locally
     rbenv local  3.0.2
     # see global
     rbenv global

    # echo  ~/.rbenv/bin/rbenv init
    # curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
    #check rbenv repl and ruby
    echo "where is the repl:"
    rbenv which irb
    echo "List installed versions:"
    rbenv versions
    echo "where is the ruby and version dir:"
    rbenv which ruby
    #update ruby set
    sudo rm /usr/bin/ruby
    sudo ln -s "$(rbenv which ruby)" /usr/bin/ruby
    # echo $PATH_BRC
    curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
   #source
   . ~/.bashrc

fi
}
is_root(){
   [ $(id -u) -eq 0 ] && return $TRUE || return $FALSE
}
is_root && echo "You are logged in as root." || is_processed && echo "You are not logged in as root." 




 