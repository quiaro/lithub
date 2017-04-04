'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const jwt = require('jsonwebtoken');
const secret = require('./secrets/secrets');

module.exports = app; // for testing

let config = {
  appRoot: __dirname // required config
};
config.swaggerSecurityHandlers = {
  Bearer: function securityHandler(req, authOrSecDef, apiKey, cb) {
    // Get the token from the request headers and verify that it's correct
    let token = apiKey && apiKey.split('Bearer:');
    token = token && token.length == 2 && token[1].trim();
    jwt.verify(token, secret.secret, function(err, decoded) {
      if (err) {
        var err = new Error('Failed to authenticate using bearer token');
        err['statusCode'] = 401; // custom error code
        cb(err);
      } else {
        // Authentication was successful.
        // Attach decoded token to request object so the token decoding process
        // doesn't have to be repeated anywhere else
        req.__decodedToken__ = decoded;
        cb();
      }
    })
  }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});
