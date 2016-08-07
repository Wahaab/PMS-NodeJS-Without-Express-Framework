/*var to  = require("socket.io").listen(1338);

console.log("function fileUpload_listener() called");

to.sockets.on('connection', function(socket)
{
    console.log(" to.sockets.on('connection' called");

    socket.emit("conn established");

       socket.on('send-file',function(name, buffer)
    {
        console.log ("socket.on('send-file' = " +name);
    });
});*/
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1/test');
db.once('open', function()
{
var schema = new mongoose.Schema(
    {
        name: {type: String},
        owner: {type: String},
        task: {type: Array},
        user: {type: Array}
    });

var files = db.model('files',schema);

files.findOne({name: }, function(err, file)
{

    file.task = file.task.concat("notdummy");
    file.user = file.user.concat('wahaabjb');
    file.save();
    console.log('entry saved successfully');
});
});