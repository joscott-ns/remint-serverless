'use strict';

const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
AWS.config.update({region: "us-west-2"});
const jwt = require('jsonwebtoken');

module.exports.remint = (event, context, callback) => {

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    done(null, {"name":"Joshua"})
};

/*
module.exports.mint = (event, context, callback) => {

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const secret = process.env.SECRET;

    let sapId = event["queryStringParameters"]['sapid'];

    try {
        let encryptedId = jwt.sign({ "ns-uid": sapId, "ns-aid":sapId}, secret);
        done(null, {"eid":encryptedId});
    } catch (err){
        console.log("err", err);
        done(err, null);
    }
};
*/