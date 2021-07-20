   #!/bin/bash

    #https://github.com/rbenv/rbenv
    #installing Ruby version management tool 
    
    
   
    # echo 'eval "$(rbenv init - bash)"

      #  sudo rm -rf /home/vagrant/.rbenv 
       
       sudo apt-get install rbenv

      #  git clone https://github.com/sstephenson/rbenv.git  /home/vagrant/.rbenv 
      #  echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
      #  sudo PATH_BRC=$PATH bash -c "source ~/.bashrc"
      #  echo $PATH_BRC
      #  sudo PATH_R=$PATH bash -c 'eval "$(rbenv init -)"'
      #  echo $PATH_R
      # sudo eval "$(rbenv init - bash)"
      echo 'eval "$(rbenv init -)"' >> ~/.bashrc
      echo "This is logged user: "$USER 
   
    ## Get the most stable 
    rbenv install -l | grep -v - | tail -1
    # sudo VER=$PATH bash -c "rbenv install $(rbenv install -l | grep -v - | tail -1)"
    # echo $VER
     echo "This might take a bit. Please wait....."
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
    # echo "where is the ruby and version dir:"
    # rbenv which ruby
    # echo $PATH_BRC
    curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
   . ~/.bashrc

       #https://github.com/rbenv/ruby-build
    if command -v ruby-build;then
    echo "ruby-build exists"
    else
    sudo git clone https://github.com/rbenv/ruby-build.git
    sudo PREFIX=/usr/local ./ruby-build/install.sh
   # git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
   # sudo sh ~/.rbenv/plugins/ruby-build/install.sh
  fi




   




 