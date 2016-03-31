/* nodejs static server, serve webapp
// write stall status from arduino to websocket
 */ 

var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , serialport = require("serialport");

var SerialPort = serialport.SerialPort; 

app.use(express.static(__dirname + '/app'));

var server = http.createServer(app);

server.listen(8080);

var wss = new WebSocketServer({server: server});
 
var sp = new SerialPort("/dev/ttyACM0", {
  parser: serialport.parsers.readline("\n")
});

sp.on('open', function () {
  console.log("opened serial port");
});

wss.on('connection', function(ws) {
  var stallId = parseInt(ws.upgradeReq.url.substr(1), 10);
  console.log('connecting to stall: ' + stallId);
  sp.on('data', function (data) {
    console.log(data);
    var message = data.split(',');
    if (message[0] === stallId) {
      ws.send(message[1]);
    }
    // ws.send("0");
  });
  ws.on('close', function() {
    console.log('closing ws connection');
  });
});
