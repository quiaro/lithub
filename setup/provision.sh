
# === Install NodeJS
# Install NodeJS v7.x
curl -sL https://deb.nodesource.com/setup_7.x | bash - && apt-get -y install nodejs


# === Install MongoDB
# Import the public key used by the package management system
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

# Create a list file for MongoDB
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

# Reload local package database
sudo apt-get update

# Install the MongoDB packages
sudo apt-get install -y mongodb-org

# Run upgrade installation packages
sudo apt-get upgrade


# === Configure MongoDB
# Create sysvinit script to disable transparent huge pages (THP)
# Per: https://docs.mongodb.com/manual/tutorial/transparent-huge-pages
# To solve: https://askubuntu.com/questions/597372/how-do-i-modify-sys-kernel-mm-transparent-hugepage-enabled
sudo cat ./setup/db/disable-thp > /etc/init.d/disable-thp

# Make script for disablig THP executable
sudo chmod 755 /etc/init.d/disable-thp

# Replace mongo config file with config file that has access control enabled.
# Per: https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-auth
# We'll continue to have access to the database until the first user is created,
# which takes place in the DB init script. This means that the DB init script
# will only be run once when the environment is created. After this, the DB init
# script will result in an error: "Error: couldn't add user" if provisioning
# is run again.
sudo rm /etc/mongod.conf
sudo cat ./setup/db/access-control.conf > /etc/mongod.conf

# Start mongodb with access control enabled
sudo service mongod start

# Connect to mongodb and create db user
mongo --nodb ./setup/db/init.js

# Stop mongodb to be restarted on smaller provision file
sudo service mongod stop

# Remove setup files used during provisioning
rm -rf ./setup


# === Load NPM global package dependencies
# npm install -g swagger@0.7.5
