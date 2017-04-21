# Overwrite host locale in ssh session
# Per: https://www.vagrantup.com/docs/vagrantfile/tips.html
ENV["LC_ALL"] = "en_US.UTF-8"
VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Upload DB config information used during provisioning (also used by the server)
  config.vm.provision "file", source: "./server/secrets/db.js",
                              destination: "./setup/db/info.js"

  # Upload DB config file
  config.vm.provision "file", source: "./setup/db/access-control.conf",
                              destination: "./setup/db/access-control.conf"

  # Upload DB init script
  config.vm.provision "file", source: "./setup/db/init.js",
                              destination: "./setup/db/init.js"

  # Upload script to disable THP
  config.vm.provision "file", source: "./setup/db/disable-thp",
                              destination: "./setup/db/disable-thp"

  # Long provision script
  config.vm.provision "shell", path: "./setup/provision.sh"

  # Short script to start services
  config.vm.provision "shell", path: "./setup/services.sh", run: "always"

  config.vm.box = "ubuntu/xenial64"
  config.vm.network "forwarded_port", guest: 3000, host: 3001
  config.vm.network "forwarded_port", guest: 10010, host: 10011
  config.vm.network "forwarded_port", guest: 27017, host: 27018
end
