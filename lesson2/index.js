/**
 * Created by student on 15.03.16.
 */

const http = require("http");
var counter = 0;
var server = http.createServer(function(req,res,next){
    res.setHeader('Content-Type','text/html;charset=utf8');
    var temp = req.url;

    if(temp=="/index.html"){
        counter++;
        res.end(req.url);

    }else if(temp=="/count.html"){
        res.end("Вы заходили на страничку index.html "+ counter +" раз");
    }else{
        res.end('404 "Page not found!');
    }

});
server.listen(3000);
