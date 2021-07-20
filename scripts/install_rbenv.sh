   #!/bin/bash

    #https://github.com/rbenv/rbenv
    #installing Ruby version management tool 
    sudo apt-get install rbenv
    # echo 'eval "$(rbenv init - bash)"
    sudo PATH_BRC=$PATH bash -c "source ~/.bashrc"
    echo $PATH_BRC
    echo 'eval "$(rbenv init -)"' >> ~/.bashrc
    echo "This is logged user: "$USER 
   

    #https://github.com/rbenv/ruby-build
    sudo git clone https://github.com/rbenv/ruby-build.git
    sudo PREFIX=/usr/local ./ruby-build/install.sh
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
    source ~/.bashrc
