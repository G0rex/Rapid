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
//let Memcached = require('memcached');
let client = new Memcached("127.0.0.1:11211");


module.exports = {

    getAction: function * (next) {
        try {
            var result=yield client.get(this.params.key);
            this.body=result;
	this.status = 200;
        } catch (e) {
            this.status = 400;
            this.body = {message: "Bad Request"};
        }
        yield next;
    },
    putAction: function * (next) {
        console.log("PUT");


            try {

                yield client.replace(this.request.body.key, this.request.body.value, this.request.body.expires);
                this.status=201;
            } catch (e) {
                this.status = 400;
                this.body = {message: "Bad Request"};
            }
            yield next;

    },

    postAction: function * (next) {

                //console.log(this.request.body.key+"3333333");
                //  this.body=this.request.body;
        try {
                yield client.set(this.request.body.key, this.request.body.value, this.request.body.expires);
                this.status = 201;
        } catch (e) {
            this.status = 400;
            this.body = {message: "Bad Request"};
        }
                yield next;
                //console.log(client.get(this.request.body.key));

    },
    deleteAction: function * (next) {


            try {
                yield client.del(this.request.body.key);
                this.status=200;
            } catch (e) {
                this.status = 400;
                this.body = {message: "Bad Request"};
            }
        yield next;
    }
};
