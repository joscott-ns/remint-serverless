'use strict';

const responseHeaders = {
    'Content-Type': 'application/json',
    // Required for CORS support to work
    'Access-Control-Allow-Origin': '*',
    // Required for cookies, authorization headers with HTTPS
    'Access-Control-Allow-Credentials': true
};


module.exports.done = (err, res) => callback(null, {
    statusCode: err ? '400' : '200',
    body: err ? err.message : JSON.stringify(res),
    headers: responseHeaders,
});



