var express = require('express');
var app     = express();
var http    = require('http').Server(app);

// Tell node where to find static files
// sets of the server with files that don't need to rerender by any engine these wont change
app.use(express.static(__dirname + '/public'));


// Serve up the index.html file.
app.get('/',function(req, res){
	 res.sendFile(__dirname + '/index.html');
});

// Run on a local port. env= enviroment. PORT opens up a spicfic port number
// What ever PORT or 3000
	http.listen(process.env.PORT || 3000, function(){
        console.log('listening on *:3000');


});