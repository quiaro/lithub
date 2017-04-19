# Overwrite host locale in ssh session
# Per: https://www.vagrantup.com/docs/vagrantfile/tips.html
ENV["LC_ALL"] = "en_US.UTF-8"
VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Upload config files & scripts
  config.vm.provision "file", source: "./setup/mongod-default.conf",
                              destination: "./setup/mongod-default.conf"
  config.vm.provision "file", source: "./setup/mongod-access-control.conf",
                              destination: "./setup/mongod-access-control.conf"
  config.vm.provision "file", source: "./setup/disable-transparent-hugepages",
                              destination: "./setup/disable-transparent-hugepages"
  config.vm.provision "file", source: "./setup/mongo-user-admin.js",
                              destination: "./setup/mongo-user-admin.js"
  config.vm.provision "file", source: "./setup/mongo-db-user.js",
                              destination: "./setup/mongo-db-user.js"

  # Long provision script
  config.vm.provision "shell", path: "provision.sh"

  # Short script to start services
  config.vm.provision "shell", path: "services.sh", run: "always"

  config.vm.box = "ubuntu/xenial64"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
end
