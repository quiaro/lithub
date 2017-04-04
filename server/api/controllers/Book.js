const mongo = require('../helpers/mongo')

function handleError(e) {
  let error = new Error('Unexpected error');
  console.error(e);

  if (e.name == 'MongoError') {
    error.code = 503;
    error.message = 'Unable to connect to database. Please try again shortly.';
  } else {
    error.code = 500;
    error.message = 'Unable to fulfill request at this time.';
  }
  return error;
}

function saveAssessment(req, res) {
  const user = {
    uid: req.__decodedToken__.uid,
    username: req.__decodedToken__.preferred_username
  }
  const reqReview = req.swagger.params.bookReview.value;
  const title = reqReview.title;
  const author = reqReview.author;
  const rating = reqReview.rating;
  const comments = reqReview.comments;
  const review = {
    uid: user.uid,
    username: user.username,
    rating: rating,
    comments: comments,
    created: new Date()
  }

  return mongo.connect()
    .then(db => {
      // Insert a new book, if an existing one doesn't already exist
      // with the corresponding book assessment embedded
      return db.collection('books').findOneAndUpdate({
        title: title,
        author: author
      }, { $setOnInsert: {
        title: title,
        author: author,
        created: new Date(),
      }, $set: {
        lastModified: new Date()
      }, $push: {
        reviews: review
      } }, {
        upsert: true,
        returnOriginal: false
      }).then(result => {
        const book = result.value;
        const entry = {
          book_id: book._id,
          book_title: book.title,
          user_id: user.uid,
          rating: rating,
          created: new Date()
        }
        return db.collection('books_history').insertOne(entry)
          .then(doc => {
            entry._id = doc.insertedId;
            res.status(201).json(entry);
          })
      })
    }, (e) => {
      // TODO: make any rollback changes in the DB if necessary
      return db.close().then(() => { throw e; })
    })
    .catch(e => {
      let error = handleError(e);
      res.status(error.code).json({
           message: error.message
         })
    })
}

module.exports = {
  post: saveAssessment
}
