const MongoClient = require('mongodb').MongoClient;
const DB = require('../../secrets/db');
let dbConnection;

/**
 * Establishes and saves a connection to the DB
 * @return {Promise.<Object|Error>} - database connection
 */
function connect() {
  const username = DB.admin.username;
  const pwd = DB.admin.password;

  return MongoClient.connect(`mongodb://${username}:${pwd}@${DB.ip}:${DB.port}/${DB.name}`)
    .then(db => {
      // Save database connection to be reused in the app
      dbConnection = db;
      return dbConnection;
    })
}

/**
 * Gets a database connection
 * @return {Object} - database connection
 * @throws {Error} - if no database connection was found
 */
function getDBConnection() {
  if (!dbConnection) { throw new Error('No database connection found'); }
  return dbConnection;
}

/**
 * Find user in the database by his email address
 * @param {string} email - User email address
 * @param {object} db - Database reference
 * @return {Promise.<object|integer>} - user object | error code
 */
function findUserByEmail(email) {
 return new Promise((resolve, reject) => {
   if (process.env.NODE_ENV !== 'production') {
     console.log('LOG: Finding user by email in the DB');
   }
   // If there's no user email to search for then reject
   if (!email) { reject(null) }
   db = getDBConnection();
   db.collection('users').findOne({ email: email })
     .then(doc => {
       if (doc) {
         resolve(doc)
       } else {
         reject(new Error('User not found'))
       }
     })
   })
}

 /**
  * Add a new user to the DB
  * @param {string} userProfile - User profile per definition in: /server/api/swagger/swagger.yaml
  * @param {object} hash - Password information made up of:
  *                        - key: password hash
  *                        - salt: salt used to calculate the password hash
  *                       Should be null if the user is signing in via 3rd-party oauth
  * @param {object} db - Database reference
  * @return {Promise.<object|integer>} - user profile | error
  */
function createUser(userProfile, hash) {
 // Make a copy of the user profile information and add the
 // password information to it (users signed in via a 3rd-party
 // oauth provider would not include the password information)
 var user = Object.assign({}, userProfile);
 // Prepare user profile object for saving
 delete user.token;
 delete user.uid;  // For saving, the auto-generated _id will be used instead of uid

 if (hash) {
   user['password'] = hash.key;
   user['salt'] = hash.salt;
 }
 db = getDBConnection();
 return db.collection('users').insertOne(user).then((doc) => {
   if (process.env.NODE_ENV !== 'production') {
     console.log(`LOG: New user added to the DB with ID: ${doc.insertedId}`);
   }
   // Add the newly assigned ID to the user profile
   userProfile._id = doc.insertedId;
   return userProfile;
 })
}

 /**
  * Check if a user already exists in the DB, if not create him
  * with the profile information provided
  *
  * @param {object} userProfile - User profile per definition in: /server/api/swagger/swagger.yaml
  * @return {Promise.<true|Error>}
  */
function findUserOrCreate(userProfile) {
 return new Promise((resolve, reject) => {
   findUserByEmail(userProfile.email)
     .then(resolve)
     .catch(() => {
       createUser(userProfile, null)
         .then(resolve)
         .catch(reject)
     })
 })
}

module.exports = {
  connect,
  getDBConnection,
  createUser,
  findUserByEmail,
  findUserOrCreate
}
