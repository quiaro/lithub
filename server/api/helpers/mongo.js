let MongoClient = require('mongodb').MongoClient;

/**
 * Provide a connection to the DB
 */
function connect() {
  return MongoClient.connect('mongodb://lithub:fudgemania!@localhost:27017/lithub')
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
    db.collection('users').findOne({ _id: uid })
      .then(doc => {
        if (doc) {
          resolve(doc)
        } else {
          reject(null)
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
     db.collection('users').findOne({ email: email })
       .then(doc => {
         if (doc) {
           resolve(doc)
         } else {
           reject(null)
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
   delete user.uid;
   user._id = userProfile.uid;

   if (hash) {
     user['password'] = hash.key;
     user['salt'] = hash.salt;
   }
   return db.collection('users').insertOne(user).then(() => {
     console.log('LOG: New user added to the DB');
     return userProfile;
   })
 }

module.exports = {
  connect,
  findUserById,
  findUserByEmail,
  createUser
}
