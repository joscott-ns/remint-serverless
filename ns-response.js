'use strict';

let cors = true;

let corsHeaders = {
    'Content-Type': 'application/json',
    // Required for CORS support to work
    'Access-Control-Allow-Origin': '*',
    // Required for cookies, authorization headers with HTTPS
    'Access-Control-Allow-Credentials': true
};


module.exports.done = (err, res, callback) => {
    let resp = {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res)
    };
    if(cors) {
        resp.headers = corsHeaders;
    } else{
        resp.headers = {'Content-Type': 'application/json'};
    }
    callback(null,resp);
};



