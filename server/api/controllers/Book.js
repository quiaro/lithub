const db = require('../helpers/mongo').getDBConnection();

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
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to fulfill request at this time.' })
    })
}

module.exports = {
  post: saveAssessment
}
