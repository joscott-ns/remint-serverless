'use strict';

const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
AWS.config.update({region: "us-west-2"});
const jwt = require('jsonwebtoken');
const response = require('./ns-response.js');

response.cors = true;

module.exports.remint = (event, context, callback) => {

    const secret = Buffer.from(process.env.SECRET, 'base64');
    const ttl = process.env.TTL;

    let eid = event.eid;

    try {
        let token = jwt.verify(eid, secret, { algorithm: ['HS256'], maxAge: ttl * 60 });
        console.log('Token:', token);
        let ping = {};
        ping.businessEntity = {};
        ping.businessEntity.encryptedId = jwt.sign({ "ns-uid": token['ns-uid'], "ns-aid": token['ns-aid'] }, secret);
        response.done(null, ping, callback);
    } catch (err) {
        console.log("err", err);
        response.done(err, null, callback);
    }
};
