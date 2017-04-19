const crypto = require('crypto')

const secret = 'PRIVATE_SECRET'
const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const ITERATIONS = 107;

/**
 * Create a hashed password from a plain text password.
 *
 * Based on:
 * http://stackoverflow.com/questions/26519031/cryptography-best-practices-for-password-storage-in-node
 *
 * @param {string} password - Plain text password
 * @param {string} salt - Salt used for the hashing function
 * @return {Promise.<object|Error>} - Object contains two properties:
 *        key: password hashed key
 *        salt: salt used for the hashing function
 */
function getHashedPassword(password, salt) {
  return new Promise((resolve, reject) => {
    // Generate salt in case a newly hashed password is needed
    crypto.randomBytes(SALT_LENGTH, function(err, newSalt) {
      if (err) reject(err);

      // If no salt parameter was defined then use the generated salt value
      salt = salt ? Buffer.from(salt) : newSalt;

      crypto.pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, 'DIGEST_ALGORITHM', function(err, key) {
        if (err) reject(err);

        // console.log('Password hashed to: ', key.toString('hex'));
        // console.log('Using salt: ', salt.toString('hex'));
        resolve({
          key: key,
          salt: salt
        });
      });
    });
  });
};

module.exports = {
  secret,
  getHashedPassword
};
