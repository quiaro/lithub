const db = require('../helpers/mongo').getDBConnection();
const ObjectID = require('mongodb').ObjectID;

/**
 * Get all articles for which the user has submitted a review
 */
function get(req, res) {
  const uid = req.__decodedToken__.uid;

  return db.collection('articles')
    .find({ reviews: { $elemMatch: { 'uid': uid } } })
    .project({ title: 1, author: 1, link: 1, 'reviews.$': 1 })
    .toArray()
    .then(articles => {
      result = articles.map(article => {
        // Merge the article attributes with the user's review
        // into a single object
        return Object.assign(
          {
            _id: article._id,
            title: article.title,
            author: article.author,
            link: article.link
          },
          article.reviews[0]
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
  const link = r.link;
  const review = {
    uid: uid,
    rating: r.rating,
    comments: r.comments,
    created: new Date(),
    last_modified: new Date()
  }

  // Insert a new article, if an existing one doesn't already exist and
  // add the user's review
  return db.collection('articles').findOneAndUpdate({
      title: title,
      author: author
    }, { $setOnInsert: {
      link: link,
      created: new Date()
    }, $set: {
      last_modified: new Date(),
    }, $push: {
      reviews: review
    } }, {
      projection: { title: 1, author: 1, link: 1 },
      upsert: true,
      returnOriginal: false
    }).then(doc => {
      // Merge the newly saved article with the user's review
      // into a single object to return to the user.
      const result = Object.assign({}, doc.value, review);
      res.status(201).json(result);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to fulfill request at this time.' })
    })
}

function put(req, res) {
  const uid = req.__decodedToken__.uid;
  const r = req.swagger.params.review.value;
  const articleId = r._id;
  const title = r.title;
  const author = r.author;
  const link = r.link;
  const review = {
    uid: uid,
    rating: r.rating,
    comments: r.comments,
    created: new Date(r.created),
    last_modified: new Date()
  }

  return db.collection('articles').findOne({
    _id: ObjectID.createFromHexString(articleId)
  }).then(doc => {
    if (doc.title === title && doc.author === author) {
      // The article information hasn't changed, that means we can replace the
      // existing review with the new review.
      return db.collection('articles').findOneAndUpdate({
          _id: doc._id,
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
            { _id: articleId, title: title, author: author, link: link },
            review
          );
          res.status(200).json(result);
        })
        .catch(e => {
          console.error(e);
          res.status(500).json({ message: 'Unable to fulfill request at this time.' })
        });
    } else {
      // The article information has changed so we need to remove the review
      // from the entry it's now in and we need to add it to another (new
      // or existing) article entry.
      removePromise = db.collection('articles').findOneAndUpdate({
          _id: ObjectID.createFromHexString(articleId),
          reviews: { $elemMatch: { 'uid': uid } }
        }, {
          $unset: { 'reviews.$': '' }
        });
      updatePromise = db.collection('articles').findOneAndUpdate({
          title: title,
          author: author
        }, { $setOnInsert: {
          link: link,
          created: new Date()
        }, $set: {
          last_modified: new Date(),
        }, $push: {
          reviews: review
        } }, {
          projection: { title: 1, author: 1, link: 1 },
          upsert: true,
          returnOriginal: false
        })
      return Promise.all([removePromise, updatePromise])
        .then(values => {
          const article = values[1].value;

          // Merge the newly saved article with the user's review
          // into a single object to return to the user.
          const result = Object.assign({}, article, review);
          res.status(200).json(result);
        })
        .catch(e => {
          console.error(e);
          res.status(500).json({ message: 'Unable to fulfill request at this time.' })
        })
    }
  })
}

function deleteReview(req, res) {
  const uid = req.__decodedToken__.uid;
  const r = req.swagger.params.review.value;
  const articleId = r._id;

  return db.collection('articles').findOneAndUpdate({
      _id: ObjectID.createFromHexString(articleId),
      reviews: { $elemMatch: { 'uid': uid } }
    }, {
      $unset: { 'reviews.$': '' }
    }, {
      returnOriginal: false
    }).then(doc => {
      // Check if the article has any more reviews; if not, delete it.
      const article = doc.value;
      if (article.reviews.length === 1) {
        // The article has only one review (i.e. the one that was just unset) so
        // it's okay to delete it.
        // TODO: If the article only has null (unset) reviews then it should be
        // deleted (even if there are more than 1)
        return db.collection('articles').findOneAndDelete({
            _id: ObjectID.createFromHexString(articleId)
          }).then(() => {
            res.status(204).json({});
          })
      } else {
        // The article entry was updated, but it was not removed.
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
