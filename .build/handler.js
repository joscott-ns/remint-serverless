const launch = require('@serverless-chrome/lambda')

const handler = require('./j92kb49ekm___handler.js')
const options = {"flags":[]}

module.exports.remint = function ensureHeadlessChrome (event, context, callback) {
  (typeof launch === 'function' ? launch : launch.default)(options)
    .then((instance) => {
      handler.remint(event, context, callback, instance)
    })
    .catch((error) => {
      console.error(
        'Error occured in serverless-plugin-chrome wrapper when trying to ' +
          'ensure Chrome for remint() handler.',
        options,
        error
      )
    })
}