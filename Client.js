var http=require('http');
var os=require('os');
var querystring=require('querystring');
var username=os.hostname();

var onError=function(e) {
	console.error("Some thing Went Wrong:",e.message);
};

var postMethod=function(host,actualdata){
var message={};
message[username]=actualdata;
var postData = querystring.stringify(message);
var options = {
  hostname: host,
  port: 8000,
  method: 'POST',
  headers: {
    'Content-Type': 'text',
    'Content-Length': postData.length
  }
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
var text=process.argv.slice(2).join(' ').trim();
if(!text)
  text="hello this is testing";//Default Message
postMethod('localhost',text); 