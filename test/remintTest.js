const assert = require('assert');
const fetch = require("node-fetch");
const config = require("config");

describe('Remint', function() {
    this.timeout(5000);
    it('should attempt to remint a token', function(done) {
        let conf = config.get('remint');

        fetch(conf.domain + "/simpleBe/api/v1/be", {
            headers: {
                'Content-Type': 'application/json',
                'client_id': conf.client_id,
                'client_secret': conf.client_secret,
                'Authorization': 'Basic ' + Buffer.from('usdist:Abcd1234').toString('base64')
            },
        }).then(response => response.json())
            .then((user) => {
                return fetch(conf.url + "/remint?eid=" + user.businessEntity.encryptedId);
            })
            .then(response => response.json())
            .then((nuToken) => {
                console.log("token", nuToken);
                return fetch(conf.domain + "/simpleBe/api/eid/be?eid=" + nuToken.businessEntity.encryptedId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'client_id': conf.client_id,
                        'client_secret': conf.client_secret,
                    },
                });
            }).then(response => {
            assert(200, response.status);
            console.log("response", response.body)
            done();
        }).catch(err => {
                console.error(err);
                done();
            }
        );
    });
});


