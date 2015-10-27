var http = require('http');
var conversations={};
var querystring=require('querystring');
var fs=require('fs');
var server=function(request,response){
	var data='';
	response.writeHead(200,{'Content-Type':'text/plain'});
	request.setEncoding('utf8');
	request.on('data',function(chunk){
		data+=chunk;
	});
	request.on('end',function(){
		if(request.method.toLowerCase()=='post'){
		var message=querystring.parse(data.toString());
		var user=Object.keys(message)[0];
		fs.appendFileSync('./'+user+'data.txt',JSON.stringify(message));	
		}
	});
	if(request.method.toLowerCase()=='get'){
		var user=getUserName(request);
		var data=fs.readFileSync('./'+user+'data.txt','utf8');
		fs.unlinkSync('./'+user+'data.txt');
		response.write(data);
	}
   	response.end();
};
http.createServer(server).listen(8002);

var getUserName=function(request){
	if(request.method.toLowerCase()=='get'){
		return request.url.split('/')[2];
	}
}
  	
