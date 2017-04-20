/*
 * Create a user with the ability to create users for other databases
 * Per: https://docs.mongodb.com/v3.2/tutorial/enable-authentication/
 */

 // DB info module comes from /secrets/db.js which is copied during
 // provisioning (see Vagrantfile)

// Mongo shell scripts do not support 'require'. A work-around to this,
// is using the load method: https://docs.mongodb.com/manual/reference/method/load/.
// The following yields the same result as:
// const dbInfo = require('./info');
const module = {};
load('./setup/db/info.js');
const dbInfo = module.exports;

// avoid an infinite loop by setting a number of max attempts
let maxAttempts = 50;
let conn;

while(!conn && maxAttempts > 0) {
    try {
        conn = new Mongo(`${dbInfo.ip}:${dbInfo.port}`);
    } catch(Error) {
        print('Unable to connect.');
    }
    maxAttempts--;
    sleep(100);
}

if (conn) {

  adminDB = conn.getDB("admin");
  adminDB.dropUser(dbInfo.userAdmin.username)
  adminDB.createUser(
    {
      user: dbInfo.userAdmin.username,
      pwd: dbInfo.userAdmin.password,
      roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
    }
  )
}
