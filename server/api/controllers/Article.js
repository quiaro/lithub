const db = require('../helpers/mongo').getDBConnection();
const ObjectID = require('mongodb').ObjectID;

function get(req, res) {
  const articleId = req.swagger.params.id.value;

  return db.collection('articles')
    .findOne({ '_id': ObjectID.createFromHexString(articleId) })
    .then(doc => {
      if (!doc) {
        res.status(404).json({ message: 'Article not found' });
      } else {
        res.status(200).json(doc);
      }
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to fulfill request at this time.' })
    })
}

module.exports = {
  get: get
}
