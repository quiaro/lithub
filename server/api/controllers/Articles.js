const db = require('../helpers/mongo').getDBConnection();

function get(req, res) {
  const limit = req.swagger.params.limit.value ? parseInt(req.swagger.params.limit.value) : 20;
  const start = req.swagger.params.start.value ? parseInt(req.swagger.params.start.value) : 0;
  const uid = req.__decodedToken__.uid;

  return db.collection('articles')
    .find({ 'reviews.uid': { $exists: true, $ne: uid } })
    .sort({ 'last_modified': -1})
    .limit(limit)
    .skip(start)
    .project({ title: 1, author: 1, last_modified: 1, 'reviews.rating': 1 })
    .toArray()
    .then(articles => {
      const result = {
        data: articles,
        meta: {
          // If there are less articles retrieved than the maximum we can expect,
          // then update the limit value to the number of articles retrieved
          limit: (articles.length < limit) ? articles.length : limit,
          start: start + articles.length
        }
      }
      res.status(200).json(result);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ message: 'Unable to fulfill request at this time.' })
    })
}

module.exports = {
  get: get
}
