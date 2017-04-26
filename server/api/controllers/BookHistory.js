const db = require('../helpers/mongo').getDBConnection();
const ObjectID = require('mongodb').ObjectID;

function get(req, res) {
  const uid = req.__decodedToken__.uid;

  return db.collection('books')
    .find({ reviews: { $elemMatch: { 'uid': uid } } })
    .project({ title: 1, author: 1, 'reviews.$': 1 })
    .toArray()
    .then(books => {
      result = books.map(book => {
        return Object.assign(
          {
            _id: book._id,
            title: book.title,
            author: book.author
          },
          book.reviews[0]
        )
      })
      res.status(200).json(result);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to fulfill request at this time.' })
    })
}

function post(req, res) {
  const uid = req.__decodedToken__.uid;
  const r = req.swagger.params.review.value;
  const title = r.title;
  const author = r.author;
  const review = {
    uid: uid,
    rating: r.rating,
    comments: r.comments,
    created: new Date(),
    last_modified: new Date()
  }

  // Insert a new book, if an existing one doesn't already exist and
  // add the user's review
  return db.collection('books').findOneAndUpdate({
      title: title,
      author: author
    }, { $setOnInsert: {
      created: new Date()
    }, $set: {
      last_modified: new Date(),
    }, $push: {
      reviews: review
    } }, {
      projection: { title: 1, author: 1 },
      upsert: true,
      returnOriginal: false
    }).then(doc => {
      const result = Object.assign({}, doc.value, review);
      res.status(201).json(result);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to fulfill request at this time.' })
    })
}

/**
 * Update the review for a book.
 * The title and author for a book cannot be updated. If these
 * need to change, a new book needs to be created.
 */
function put(req, res) {
  const uid = req.__decodedToken__.uid;
  const r = req.swagger.params.review.value;
  const bookId = r._id;
  const title = r.title;
  const author = r.author;
  const review = {
    uid: uid,
    rating: r.rating,
    comments: r.comments,
    created: new Date(r.created),
    last_modified: new Date()
  }

  return db.collection('books').findOneAndUpdate({
      _id: ObjectID.createFromHexString(bookId),
      reviews: { $elemMatch: { 'uid': uid } }
    }, {
      $set: {
        last_modified: new Date(),
        'reviews.$': review
      }
    }).then(doc => {
      // The operation completed so we can return a result with the data
      // we already had
      const result = Object.assign(
        { _id: bookId, title: title, author: author },
        review
      );
      res.status(200).json(result);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to fulfill request at this time.' })
    });
}

function deleteReview(req, res) {
  const uid = req.__decodedToken__.uid;
  const r = req.swagger.params.review.value;
  const bookId = r._id;

  return db.collection('books').findOneAndUpdate({
      _id: ObjectID.createFromHexString(bookId),
      reviews: { $elemMatch: { 'uid': uid } }
    }, {
      $unset: { 'reviews.$': '' }
    }, {
      returnOriginal: false
    }).then(doc => {
      // Check if the book has any more reviews; if not, delete it.
      const book = doc.value;
      if (book.reviews.length === 1) {
        // The book has only one review (i.e. the one that was just unset) so
        // it's okay to delete it.
        return db.collection('books').findOneAndDelete({
            _id: ObjectID.createFromHexString(bookId)
          }).then(() => {
            res.status(204).json({});
          })
      } else {
        // The book entry was updated, but it was not removed.
        res.status(204).json({});
      }
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to fulfill request at this time.' })
    })
}

module.exports = {
  get: get,
  post: post,
  put: put,
  delete: deleteReview
}
