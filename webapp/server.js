// nodejs static server
// read out stall status from receiver websocket
// serve human interface webapp

// @TODO

var express = require('express');
var app = express();

app.use(express.static('app'));

app.listen(8000, function () {
  console.log('Poop Drive is running on port 8000!');
});
