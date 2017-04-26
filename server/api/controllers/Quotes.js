const db = require('../helpers/mongo').getDBConnection();

function get(req, res) {
  const limit = req.swagger.params.limit.value ? parseInt(req.swagger.params.limit.value) : 20;
  const start = req.swagger.params.start.value ? parseInt(req.swagger.params.start.value) : 0;
  const uid = req.__decodedToken__.uid;

  return db.collection('quotes')
    .find({ 'reviews.uid': { $exists: true, $ne: uid } })
    .sort({ 'last_modified': -1})
    .limit(limit)
    .skip(start)
    .project({ quote: 1, author: 1, last_modified: 1, 'reviews.uid': 1 })
    .toArray()
    .then(quotes => {
      const result = {
        data: quotes,
        meta: {
          // If there are less quotes retrieved than the maximum we can expect,
          // then update the limit and start values to prevent more calls from
          // being made.
          limit: (quotes.length < limit) ? quotes.length : limit,
          start: (quotes.length < limit) ? -1 : start + quotes.length
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
