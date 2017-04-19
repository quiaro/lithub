# Ensure THP is disabled before starting mongo daemon
sudo /etc/init.d/disable-transparent-hugepages start

# Start mongoDB
sudo service mongod start

vagrantTip="[35m[1mThe shared directory is located at /vagrant\nTo access your shared files: cd /vagrant(B[m"
echo -e $vagrantTip > /etc/motd
