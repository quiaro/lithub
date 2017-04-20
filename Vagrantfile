# Overwrite host locale in ssh session
# Per: https://www.vagrantup.com/docs/vagrantfile/tips.html
ENV["LC_ALL"] = "en_US.UTF-8"
VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Upload DB config information used during provisioning
  # and used also by the server
  config.vm.provision "file", source: "./server/secrets/db.js",
                              destination: "./setup/db/info.js"

  # Upload DB config files
  config.vm.provision "file", source: "./setup/db/default.conf",
                              destination: "./setup/db/default.conf"
  config.vm.provision "file", source: "./setup/db/access-control.conf",
                              destination: "./setup/db/access-control.conf"

  # Upload DB init scripts
  config.vm.provision "file", source: "./setup/db/user-admin.js",
                              destination: "./setup/db/user-admin.js"
  config.vm.provision "file", source: "./setup/db/admin.js",
                              destination: "./setup/db/admin.js"

  # Upload script to disable THP
  config.vm.provision "file", source: "./setup/db/disable-thp",
                              destination: "./setup/db/disable-thp"

  # Long provision script
  config.vm.provision "shell", path: "./setup/provision.sh"

  # Short script to start services
  config.vm.provision "shell", path: "./setup/services.sh", run: "always"

  config.vm.box = "ubuntu/xenial64"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
end
