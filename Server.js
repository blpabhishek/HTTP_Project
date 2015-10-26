var http = require('http');
var os=require('os');
var username=os.hostname();
var querystring=require('querystring');
var server=function(request,response){
	response.writeHead(200,{'Content-Type':'text/plain'});
	request.setEncoding('utf8');
	console.log("request:",request.headers);
	request.on('data',function(chunk){
		console.log(querystring.parse(chunk.toString()));
	});
   	response.end("Connected to "+username+"'s Server");
};
http.createServer(server).listen(8000);
  	
