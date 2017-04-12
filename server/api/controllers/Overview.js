const db = require('../helpers/mongo').getDBConnection();

function getBooks(req, res) {

  return db.collection('books')
    .find({ 'reviews.uid': { $exists: true } })
    .sort({ 'last_modified': -1})
    .limit(10)
    .project({ title: 1, author: 1, last_modified: 1, 'reviews.rating': 1 })
    .toArray()
    .then(books => {
      res.status(200).json(books);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to fulfill request at this time.' })
    })
}

module.exports = {
  getBooks: getBooks
}
