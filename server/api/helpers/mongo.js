let MongoClient = require('mongodb').MongoClient;
let databaseConnection;

/**
 * Establishes and saves a connection to the DB
 * @return {Promise.<Object|Error>} - database connection
 */
function connect() {
  return MongoClient.connect('mongodb://lithub:fudgemania!@localhost:27017/lithub')
    .then(db => {
      // Save database connection to be reused in the app
      databaseConnection = db;
      return databaseConnection;
    })
}

/**
 * Gets a database connection
 * @return {Object} - database connection
 * @throws {Error} - if no database connection was found
 */
function getDBConnection() {
  if (!databaseConnection) { throw new Error('No database connection found'); }
  return databaseConnection;
}

/**
 * Find user in the database by his ID
 * @param {string} uid - User ID in the DB
 * @param {object} db - Database reference
 * @return {Promise.<object|integer>} - user object | error code
 */
function findUserById(uid, db) {
  return new Promise((resolve, reject) => {
    console.log('LOG: Finding user by uid in the DB');
    // If there's no user id to search for then reject
    if (!uid) { reject(null) }
    db.collection('users').findOne({ _id: uid })
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
 * Find user in the database by his email address
 * @param {string} email - User email address
 * @param {object} db - Database reference
 * @return {Promise.<object|integer>} - user object | error code
 */
function findUserByEmail(email, db) {
 return new Promise((resolve, reject) => {
   console.log('LOG: Finding user by email in the DB');
   // If there's no user email to search for then reject
   if (!email) { reject(null) }
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
function createUser(userProfile, hash, db) {
 // Make a copy of the user profile information and add the
 // password information to it (users signed in via a 3rd-party
 // oauth provider would not include the password information)
 var user = Object.assign({}, userProfile);
 // Prepare user profile object for saving
 delete user.token;
 delete user.uid;  // For saving, the attribute _id will be used instead of uid

 if (userProfile.uid) {
    // In the case of Facebook, the user will be saved using Facebook's ID
    user._id = userProfile.uid;
 }

 if (hash) {
   user['password'] = hash.key;
   user['salt'] = hash.salt;
 }
 return db.collection('users').insertOne(user).then((doc) => {
   console.log(`LOG: New user added to the DB with ID: ${doc.insertedId}`);
   // If the user profile had a uid then doc's _id value should not
   // have changed
   userProfile.uid = doc.insertedId;
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
function findUserOrCreate(userProfile, db) {
 return new Promise((resolve, reject) => {
   findUserById(userProfile.uid, db)
     .then(() => { resolve(userProfile) })
     .catch(() => {
       findUserByEmail(userProfile.email, db)
         .then((doc) => {
           userProfile.uid = doc._id;
           resolve(userProfile)
         })
         .catch(() => {
           return createUser(userProfile, null, db)
         })
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
