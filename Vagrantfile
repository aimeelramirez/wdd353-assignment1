# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/focal64"
  config.vm.network "private_network", ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 443, host: 4443
  # config.vm.network "forwarded_port", guest:3306, host:3306
  config.vm.synced_folder "./", "/var/www/html"

  # config.ssh.username = 'vagrant'
  # config.ssh.password = 'vagrant'
  # config.ssh.insert_key = 'true'
  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  end
  $rootScript = <<SCRIPT
   echo "I am provisioning..."
   echo Doing it as $USER
SCRIPT

## This is the script that will install nvm as the default 'vagrant' user
$userScript = <<SCRIPT

  cd /home/vagrant
  # Installing nvm
  wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh

  # make a copy to usr/local to read it without .
  FILE_OPT=/usr/local/opt
   run_install(){
    echo "configuring nvm"
    #delete if exists
    sudo rm -rf  /usr/local/opt/nvm
    echo $FILE_OPT
    (cd $FILE_OPT; echo "I'm now in $PWD"  )
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
    sudo SOURCE_NVM=$PATH bash -c "source /usr/local/opt/nvm/nvm.sh && echo 'configuring source'" 
    echo $SOURCE_NVM
    # Install a node and alias
     if command -v node; then
        echo "Node exists!" 
    else
        echo "node does not exist" 
        nvm install 0.10.33
        nvm alias default 0.10.33
        nvm use node
    fi
    if command -v ruby-build; then
        echo "Ruby exists!"
    else
       echo "ruby does not exist" 
       sudo PATH_RUBY=$PATH bash -c "cd /var/www/html;echo "CHECKPYRB=true" > scripts/check.sh &&  sudo bash scripts/init_installs.sh && echo 'Running Ruby Manager installs.'"
       echo $PATH_RUBY
       ruby -v
    fi
      if command -v pip; then
        echo "Python exists!"
      else
       echo "python does not exist" 
       sudo PATH_PY=$PATH bash -c "cd /var/www/html; echo "CHECKPYRB=false" > scripts/check.sh &&  sudo bash scripts/init_installs.sh && echo 'Running Python Manager installs.'"
        echo $PATH_PY
        sudo PATH_RMPY=$PATH bash -c "sudo rm get-pip.py"
        echo $PATH_RMPY
      fi
       
    }
 if test -d $FILE_OPT; then
    run_install
   else 
    # create the dir if not existing
    echo "file does not exist."
    sudo mkdir /usr/local/opt/
    run_install
  fi
SCRIPT

  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Ansible, Chef, Docker, Puppet and Salt are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   # apt-get install -y apache2
  # SHELL
  # config.vm.provision :shell, path: "~/vagrant/nodejs.sh", privileged: false
config.vm.provision "shell", inline: $rootScript
config.vm.provision "shell", inline: $userScript, privileged: false
end

