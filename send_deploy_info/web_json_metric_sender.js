var send_metric = require('request'); //nodejs request module
var express = require('express'); //nodejs express module
var app = express();

app.use(express.json({limit: '1mb'})); //increase json cache limit for express

app.post('/', function(request, res){ //take post request on "/"
  console.log(request.body)
  if (request.body.build.changes.length > 0) {
    Commit = request.body.build.changes[0].version;
    Comment = request.body.build.changes[0].change.comment;
    Comment = Comment.replace(/(\r\n|\n|\r)/gm,"");
  } else {
      for (var i=0; i<request.body.build.teamcityProperties.length; i++){
        if(request.body.build.teamcityProperties[i].name == "build.vcs.number") {
          Commit = request.body.build.teamcityProperties[i].value;
          Comment = 'undefined';
            }
           }
         }
/* From JSON TeamCity Web Hook in array "changes" take last commit and comment
for it, if array "changes" empty parse arry "teamcityProperties" for last commit value
and set Comment variable as undefined*/


  send_metric.post({
    headers: {'Content-Type' : 'text/plain'},
    url:     'http://address:9091/metrics/job/'+request.body.build.buildName+'/instance/'+request.body.build.projectName,
    body:    request.body.build.projectId+'{TriggeredBy="'+request.body.build.triggeredBy+'" , BuildResult="'+request.body.build.buildResult+'" , NotifyType="'+request.body.build.notifyType+'" , BuildResultDelta="'+request.body.build.buildResultDelta+'" , BuildId="'+request.body.build.buildNumber+'" , Commit="'+Commit+'" , Comment="'+Comment+'" }'+request.body.build.buildNumber+'\n',
         }
       );
/*Send post request to prometheus pushgateway with variable from json Web Hook*/
  res.sendStatus(200); // echo the result back

});

app.listen(3500, () => {
 console.log('Server running on port %d', 3500);
}); //run web-server on port
