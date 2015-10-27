var http=require('http');
var querystring=require('querystring');
var username=require('os').hostname();

var onError=function(e) {
	console.error("Some thing Went Wrong:",e.message);
};

var postMethod=function(host,actualdata){
  var message={};
  message[username]=actualdata;
  message['destination']='localhost';
  var postData = querystring.stringify(message);
  var options = {
    hostname: host,
    port: 8002,
    method: 'POST',
    headers: {'Content-Type': 'text','Content-Length': postData.length}
  };

  var responce=function(res) {		
  	res.on('data', function (chunk) {
      console.log(chunk.toString());
    });
  }
var req = http.request(options,responce).on('error',onError);
req.write(postData);
req.end();
};


var getMethod=function(host){
var options={host:host,port:8002,method:'GET',path:'/getMessage/'+username};
  var onResponce=function(res) {
    var data='';
    res.setEncoding('utf8');
      res.on('data',function(chunk){
        data+=chunk;
    });
      res.on('end',function(){
        console.log(querystring.parse(data.toString()));
      })
  };
http.request(options,onResponce).on('error',onError).end();
}


var text=process.argv.slice(2).join(' ').trim();
if(!text)
  text="hello this is testing";//Default message
postMethod('localhost',text); //Pnadey's IP 10.4.23.176
getMethod('localhost');
//setTimeout(getMethod('localhost'),10000);
//setTimeout(getMethod('localhost'),10000);