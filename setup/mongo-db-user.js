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
  // Connecto to the admin DB where we can authenticate with 'userAdmin'
  // (see script: mongo-user-admin.js)
  adminDB = conn.getDB('admin');

  if (adminDB.auth('userAdmin', 'h_qXM,nU5adU%)}')) {

    // Create/switch to the app DB where we'll create and assign a user
    // with read/write privileges
    appDB = conn.getDB('lithub');

    // Create a user with read/write privileges for the app's database
    // Per: https://docs.mongodb.com/v3.2/tutorial/enable-authentication/
    appDB.dropUser('lithubAdmin')
    appDB.createUser(
      {
        user: "lithubAdmin",
        pwd: "S=NYvk=R*",
        roles: [{
          "role": "readWrite",
          "db": "lithub"
        }]
      }
    )
  };
}
