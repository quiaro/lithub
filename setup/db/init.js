/*
 * Create a user with read/write privileges for the app's database
 * Per: https://docs.mongodb.com/v3.2/tutorial/enable-authentication/
 */

// Mongo shell scripts do not support 'require'. A work-around to this,
// is using the load method: https://docs.mongodb.com/manual/reference/method/load/.
// The following yields the same result as:
// const dbInfo = require('./info');
const module = {};

// DB info module comes from /secrets/db.js which is copied during
// provisioning (see Vagrantfile)
load('./setup/db/info.js');
const dbInfo = module.exports;

// avoid an infinite loop by setting a number of max attempts
let maxAttempts = 50;
let conn;

while(!conn && maxAttempts > 0) {
    try {
        conn = new Mongo(`${dbInfo.ip}:${dbInfo.port}`);
    } catch(e) {
        print('Unable to connect.');
    }
    maxAttempts--;
    sleep(100);
}

if (conn) {
  adminDB = conn.getDB("admin");

  try {
    adminDB.createUser(
      {
        user: dbInfo.userAdmin.username,
        pwd: dbInfo.userAdmin.password,
        roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
      }
    )

    if (adminDB.auth(dbInfo.userAdmin.username, dbInfo.userAdmin.password)) {

      // Create/switch to the app DB where we'll create and assign a user
      // with read/write privileges. The user will have the ability to
      // restore the database from a dump file.
      appDB = conn.getDB(dbInfo.name);
      appDB.createUser(
        {
          user: dbInfo.admin.username,
          pwd: dbInfo.admin.password,
          roles: [{
            "role": "readWrite",
            "db": dbInfo.name
          }, {
            "role": "restore",
            "db": "admin"
          }]
        }
      )
      print(`Database user created for ${dbInfo.name}`);
    };
  } catch (e) {
    print('Failed to create user admin. Check if user admin already exists.');
  }
}
