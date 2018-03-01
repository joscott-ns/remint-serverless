'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: "us-west-2"});
const jwt = require('jsonwebtoken');
let cors = require("./ns-response.js");


module.exports.remint = cors((event, context, callback) => {

    const secret = Buffer.from(process.env.SECRET, 'base64');
    const ttl = process.env.TTL;

    let eid = event.queryStringParameters.eid;

    try {
        let token = jwt.verify(eid, secret, { algorithm: ['HS256'], maxAge: ttl * 60 });
        let ping = ping.businessEntity = {};
        ping.businessEntity.encryptedId = jwt.sign({ "ns-uid": token['ns-uid'], "ns-aid": token['ns-aid'] }, secret);
        callback(null, ping);
    } catch (err) {
        callback(err, null);
    }
});

