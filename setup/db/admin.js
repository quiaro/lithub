/*
 * Create a user with read/write privileges for the app's database
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
  // Connecto to the admin DB where we can authenticate with 'userAdmin'
  // (see script: db/user-admin.js)
  adminDB = conn.getDB('admin');

  if (adminDB.auth(dbInfo.userAdmin.username, dbInfo.userAdmin.password)) {

    // Create/switch to the app DB where we'll create and assign a user
    // with read/write privileges
    appDB = conn.getDB(dbInfo.name);
    appDB.dropUser(dbInfo.admin.username)
    appDB.createUser(
      {
        user: dbInfo.admin.username,
        pwd: dbInfo.admin.password,
        roles: [{
          "role": "readWrite",
          "db": dbInfo.name
        }]
      }
    )
  };
}
