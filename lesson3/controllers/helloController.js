
var data = { title : 'Hello, World!' };

module.exports = {
   getAction: function(request, response, next){
       /* next(null) */
       setTimeout(function(next){
           response.statusCode = 200;
           try{
               response.write(renderer.render('hello', {
                   message: "Hello world"
               }));
               next();
           }catch(e){
               next(e);
           }
       }, 500, next)
   },
    postAction: function(request, response, next){

    }
};