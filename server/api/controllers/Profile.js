const ObjectID = require('mongodb').ObjectID;
const db = require('../helpers/mongo').getDBConnection();

function get(req, res) {
  const uid = req.__decodedToken__.uid;

  return db.collection('users')
    .findOne(
      { _id: ObjectID.createFromHexString(uid) },
      { fields: { _id: 0, password: 0, salt: 0 } }
    )
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to fulfill request at this time.' })
    })
}

module.exports = {
  get: get
}
