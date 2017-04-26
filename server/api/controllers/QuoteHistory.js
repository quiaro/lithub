const db = require('../helpers/mongo').getDBConnection();
const ObjectID = require('mongodb').ObjectID;

function get(req, res) {
  const uid = req.__decodedToken__.uid;

  return db.collection('quotes')
    .find({ reviews: { $elemMatch: { 'uid': uid } } })
    .project({ quote: 1, author: 1, 'reviews.$': 1 })
    .toArray()
    .then(quotes => {
      result = quotes.map(quote => {
        return Object.assign(
          {
            _id: quote._id,
            quote: quote.quote,
            author: quote.author
          },
          quote.reviews[0]
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
  const quote = r.quote;
  const author = r.author;
  const review = {
    uid: uid,
    comments: r.comments,
    created: new Date(),
    last_modified: new Date()
  }

  // Insert a new quote, if an existing one doesn't already exist and
  // add the user's review
  return db.collection('quotes').findOneAndUpdate({
      quote: quote,
      author: author
    }, { $setOnInsert: {
      created: new Date()
    }, $set: {
      last_modified: new Date(),
    }, $push: {
      reviews: review
    } }, {
      projection: { quote: 1, author: 1 },
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
 * Update the review for a quote.
 * The author and the quote itself cannot be updated. If these
 * need to change, a new quote needs to be created.
 */
function put(req, res) {
  const uid = req.__decodedToken__.uid;
  const r = req.swagger.params.review.value;
  const quoteId = r._id;
  const quote = r.quote;
  const author = r.author;
  const review = {
    uid: uid,
    comments: r.comments,
    created: new Date(r.created),
    last_modified: new Date()
  }

  return db.collection('quotes').findOneAndUpdate({
      _id: ObjectID.createFromHexString(quoteId),
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
        { _id: quoteId, quote: quote, author: author },
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
  const quoteId = r._id;

  return db.collection('quotes').findOneAndUpdate({
      _id: ObjectID.createFromHexString(quoteId),
      reviews: { $elemMatch: { 'uid': uid } }
    }, {
      $unset: { 'reviews.$': '' }
    }, {
      returnOriginal: false
    }).then(doc => {
      // Check if the quote has any more reviews; if not, delete it.
      const quote = doc.value;
      if (quote.reviews.length === 1) {
        // The quote has only one review (i.e. the one that was just unset) so
        // it's okay to delete it.
        return db.collection('quotes').findOneAndDelete({
            _id: ObjectID.createFromHexString(quoteId)
          }).then(() => {
            res.status(204).json({});
          })
      } else {
        // The quote entry was updated, but it was not removed.
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
