'use strict';

const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
AWS.config.update({region: "us-west-2"});
const jwt = require('jsonwebtoken');
const response = require('./ns-response.js');

module.exports.mint = (event, context, callback) => {

    const secret = process.env.SECRET;
    let sapId = event["queryStringParameters"]['sapid'];

    try {
        let encryptedId = jwt.sign({ "ns-uid": sapId, "ns-aid":sapId}, secret);
        response.done(null, {"eid":encryptedId});
    } catch (err){
        console.log("err", err);
        response.done(err, null);
    }
};
