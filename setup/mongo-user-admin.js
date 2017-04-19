let conn;
// avoid an infinite loop by setting a number of max attempts
let maxAttempts = 50;

try {
    conn = new Mongo("127.0.0.1:27017");
} catch(Error) {
    print('Unable to connect.');
}

while(!conn && maxAttempts > 0) {
    try {
        conn = new Mongo("127.0.0.1:27017");
    } catch(Error) {
        print('Unable to connect.');
    }
    maxAttempts--;
    sleep(100);
}

if (conn) {
  // Create a user with the ability to create users for other databases
  // Per: https://docs.mongodb.com/v3.2/tutorial/enable-authentication/
  adminDB = conn.getDB("admin");
  adminDB.dropUser('userAdmin')
  adminDB.createUser(
    {
      user: "userAdmin",
      pwd: "h_qXM,nU5adU%)}",
      roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
    }
  )
}
