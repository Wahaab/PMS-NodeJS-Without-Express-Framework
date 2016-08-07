var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require('fs');

var conn = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

conn.once('open',function(){

    var gfs = Grid(conn.db, mongoose.mongo);


 /* var writestream = gfs.createWriteStream({
        filename: 'testfile2',
        mode: 'w'
    });
    fs.createReadStream('D:/games/batman.JPG').pipe(writestream);

    writestream.on('close',function(file)
    {
        console.log(file.filename);
    });*/


    var readstream = gfs.createReadStream ({
        filename: 'testfile.txt'
    });

    readstream.on("data",function(chunk)
    {
        var buffer="";
        console.log(buffer += chunk);
    });



 /*   gfs.remove({filename:'testfile.txt'},function(err){
        console.log('file removed successfully');
    });*/

   /* gfs.files.find().toArray(function (err, files){
        console.log(files);
    });*/

});

