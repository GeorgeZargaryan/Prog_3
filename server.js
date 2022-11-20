var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("game"));

app.get("/", function(req, res){
   res.redirect("index.html");
});

// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// });
  
server.listen(3000);

io.on('connection', function (socket) {
   socket.on("socket on", function (data) {
       io.sockets.emit("on", data);
   });
});



