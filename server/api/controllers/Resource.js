const mongo = require('../helpers/mongo')

function getAll(req, res) {
  mongo.connect().then(db => {
    db.collection('resources').find().toArray().then(docs => {
      res.json(docs)
    }).catch(error => {
      res.end(JSON.stringify(error))
    }).then(() => {
      // Remember to close the connection to the DB
      db.close()
    })
  })
}

function findById(req, res) {
  mongo.connect().then(db => {
    db.collection('resources').findOne({ _id: req.swagger.params.id.value }).then(doc => {
      res.json(doc)
    }).catch(error => {
      res.end(JSON.stringify(error))
    }).then(() => {
      db.close()
    })
  })
}

module.exports = {
  getAll: getAll,
  findById: findById
}
