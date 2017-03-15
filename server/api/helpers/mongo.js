let MongoClient = require('mongodb').MongoClient;

module.exports = {
  connect() {
    return MongoClient.connect('mongodb://lithub:fudgemania!@localhost:27017/lithub')
  }
}
