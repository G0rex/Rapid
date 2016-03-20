"use strict"
const http = require("http");

var fs = require('fs');
var Array;
var ListOfRegResult;
var counter = 0;
var resultOfTask = [];
fs.readFile('./addresses.js', 'utf8', function (err, contents) {
    var t = /'.+?'/g;//парсит по скобкам все строки


    while ((Array = t.exec(contents)) != null) {

        //var tt = /(\s?[улпрет.-]{2,5}\s)/;//парсит переулки и тд
        //var tt = /(\s?[улпрет.-]{2,5}\s)?\s?(([0-9-]{2,5})?[а-яА-Я.\s]+),?\s?/;//парсит улицу норм)
        //норм парсит дома
        //var tt = /(\s?[улпрет.-]{2,5}\s)?\s?(([0-9-]{2,5})?[а-яА-Я.\s]+),?\s([дом]{3,3})?\s?([0-9А-Я-]+)?\/?([\d]+)?/;
        var resultOfReg = /(\s?[улпрет.-]{2,5}\s)?\s?(([0-9-]{2,5})?[а-яА-Я.\s]+),?\s?([дом]{3,3})?((\s)+)?([0-9А-Я-]+)?\/?,?\s?([а-я.]+\s)?([\d]+)?/;

        ListOfRegResult = resultOfReg.exec(Array[0]);

        var Obj = {};
        if (ListOfRegResult != null) {
            Obj.street = ListOfRegResult[2];
            if (ListOfRegResult[7] != null)
                Obj.house = ListOfRegResult[7];
            if (ListOfRegResult[9] != null)
                Obj.flat = ListOfRegResult[9];
        }

        resultOfTask [counter] = Obj;

        counter++;
    }
    console.log(resultOfTask);
});
module.exports = resultOfTask;

let server = http.createServer();
server.listen(3001);