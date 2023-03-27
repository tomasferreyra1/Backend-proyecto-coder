/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  /****************************************************************************
    *                                                                           *
    * Sails/Express middleware to run for every HTTP request.                   *
    * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
    *                                                                           *
    * https://sailsjs.com/documentation/concepts/middleware                     *
    *                                                                           *
    ****************************************************************************/

  middleware: {

    /***************************************************************************
        *                                                                          *
        * The order in which middleware should be run for HTTP requests.           *
        * (This Sails app's routes are handled by the "router" middleware below.)  *
        *                                                                          *
        ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'expressSession',
      'passportInit',
      'passportSession',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon'
    ],

    expressSession: (function () {
      const session = require('express-session')
      const sessionConfig = session({
        secret: 'secret',
        cookie: {
          httpOnly: false,
          secure: false,
          maxAge: 6000000
        },
        rolling: true,
        resave: true,
        saveUninitialized: false
      })
      return sessionConfig
    })(),

    passportInit: (function () {
      const passport = require('passport')
      const reqResNextFn = passport.initialize()
      return reqResNextFn
    })(),

    passportSession: (function () {
      const passport = require('passport')
      const reqResNextFn = passport.session()
      return reqResNextFn
    })()

    /***************************************************************************
        *                                                                          *
        * The body parser that will handle incoming multipart HTTP requests.       *
        *                                                                          *
        * https://sailsjs.com/config/http#?customizing-the-body-parser             *
        *                                                                          *
        ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

  }

}
