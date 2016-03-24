"use strict";

/**
 curl -v -X DELETE "http://127.0.0.1:8081/memcached" -d '{"key":"bar"}' -H "Content-Type: application/json"
 curl -v -X PUT "http://127.0.0.1:8081/memcached" -d '{"key":"bar","value":"valera","expires":360}' -H "Content-Type: application/json"
 curl -v -X GET "http://127.0.0.1:8081/memcached/bar"
 curl -v -X POST "http://127.0.0.1:8081/memcached" -d '{"key":"bar","value":"foo","expires":360}' -H "Content-Type: application/json"
 * @param next
 */
const co = require('co');
let Memcached = require('co-memcached');
let client = new Memcached("127.0.0.1:11211");


module.exports = {

    getAction: function * (next) {
try {
        this.body=yield client.get(this.params.key);

        yield next;
  } catch (e) {
                this.status = 400;
                this.body = {message: "Bad Request"};
            }
    },
    putAction: function * (next) {


        var coWrapper = co.wrap(function*() {
            try {
                this.body=this.request.body;
                client.replace(this.request.body.key, this.request.body.value, this.request.body.expires);

            } catch (e) {
                this.status = 400;
                this.body = {message: "Bad Request"};
            }

        }.bind(this));
        coWrapper();
    },

    postAction: function * (next) {
        var coWrapper = co.wrap(function*() {

            try {
 
                this.body=this.request.body;
                 client.set(this.request.body.key, this.request.body.value, this.request.body.expires);
                console.log(client.get(this.request.body.key));

            } catch (e) {
                this.status = 400;
                this.body = {message: "Bad Request"};
            }

        }.bind(this));
        coWrapper();

    },
    deleteAction: function * (next) {

        var coWrapper = co.wrap(function*() {
            try {

                this.body=this.request.body;
                client.del(this.request.body.key);
                console.log(client.get(this.request.body.key));
            } catch (e) {
                this.status = 400;
                this.body = {message: "Bad Request"};
            }


        }.bind(this));
        coWrapper();
    }
};
