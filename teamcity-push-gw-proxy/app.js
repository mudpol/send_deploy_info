var express = require('express'); //nodejs express module
var app = express();
var port = process.env.PORT; //Set ENV port, if undefined set default value from Dokerfile
var logTimeStamp = require('console-stamp')(console);

app.use(express.json({limit: '1mb'})); //increase json cache limit for express

//123
app.get('/', function(request, res){
  console.info('Accepted GET request on /');
  res.sendStatus(200);
});

app.post('/', function(request, res){ //take post request on "/"
  console.info('Accepted: '+request.body+'\n')

  res.sendStatus(200); // echo the result back

});

app
.listen(port, function () {
  console.log('Server start listening on port ' + port);
})
.on('error', function(error) {
  console.error(error.message)
}); //run web-server on port
