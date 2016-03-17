var data;
var database = require('../lib/module');

module.exports = {
    getAction: function (request, response, next) {
        response.setHeader('Content-Type', 'text/html;charset=utf8');
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200;
        var listOfUsers = database.Get();
        response.end(JSON.stringify(listOfUsers));


    },
    postAction: function (request, response, next) {


        var validator = require('validator');


        var body = '';
        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            var userData = JSON.parse(body),
                listsOfParams = ['nick', 'e-mail', 'description', 'name', 'age'];
            for (var key in userData) {
                var t = listsOfParams.indexOf(key);
                if (t < 0) {
                    delete userData[key];
                }
            }

            if (!(validator.isLowercase(userData['nick']) && userData['nick'].match(/([a-z0-9]+)/i)
                && userData['nick'] == userData['nick'].match(/([a-z0-9]+)/i)[0])) {// /i ignore Case
                delete userData['nick'];
            }
            if (!(userData['name'].match(/([a-zа-яъэ]+)/i) && userData['name'] == userData['name'].match(/([a-zа-яъэ]+)/i)[0])) {
                delete userData['name'];

            }
            if (!validator.isEmail(String(userData['e-mail']))) {
                delete userData['e-mail'];

            }
            if (Number(userData['age']) < 6 || Number(userData['age']) > 100) {
                delete userData['age'];

            }
            if (userData['nick'] && userData['name']) {
console.log(userData);
                database.Set(userData);
                response.statusCode = 201;
                response.end();
            } else {
                console.log(userData);
                response.statusCode = 400;
                response.end("Bad request");

            }


        });


    }
};
/*
 curl -XPOST "http://localhost:3000/users" -H 'Content-Type: application/json' -d'{"nick": "foo","name": "value","age":41}'
 curl -XPOST "http://localhost:3000/users" -H 'Content-Type: application/json' -d'{"nick": "foo@bar.com","name": "value2","e-mail": "454355","description": "foo@bar.com","age": "45","avggg": "45"}'
 curl -XPOST "http://localhost:3000/users" -H 'Content-Type: application/json' -d'{"nick": "valera","name": "Inokentiy","e-mail": "fffff@gmail.com","description": "молодой и талантливый","age": "65"}'
 curl -XPOST "http://localhost:3000/users" -H 'Content-Type: application/json' -d'{"nick": "cxvcxv","name": "cvxcvcv","e-mail": "fcvf@gmail.com","description": "cxvxcvxc","age": "76"}'
 curl -XPOST "http://localhost:3000/users" -H 'Content-Type: application/json' -d'{"nick": "foo@bar.com","name": "value2","e-mail": "454355","description": "foo@bar.com","age": "45","sdfsdfsd":"3423423"}'
 //"nick", "name", "e-mail", "description", "age"
 curl -XGET "http://localhost:3000/users"
 из строки JSON в об'экт JSON.parse(arguments)
 наоборот JSON.stringify
 */