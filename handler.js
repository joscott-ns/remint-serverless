'use strict';

const AWS = require("aws-sdk");
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

    const secret = process.env.SECRET;
    const ttl = process.env.TTL;

    console.log("secret", secret);


    let eid = event["queryStringParameters"]['eid'];

    try {
        let token = jwt.verify(eid, secret, {algorithms: ['HS256'], maxAge: ttl * 60});
        let ping = {};
        ping.businessEntity = {};
        ping.businessEntity.encryptedId = jwt.sign({ "ns-uid": token['ns-uid'], "ns-aid":token['ns-aid']}, secret);
        done(null, ping);
    } catch (err){
        console.log("err", err);
        done(err, null);
    }
};


module.exports.mint = (event, context, callback) => {

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const secret = process.env.SECRET;

    console.log("secret", secret);

    let sapId = event["queryStringParameters"]['sapid'];

    try {
        let encryptedId = jwt.sign({ "ns-uid": sapId, "ns-aid":sapId}, secret);
        done(null, {"eid":encryptedId});
    } catch (err){
        console.log("err", err);
        done(err, null);
    }
};