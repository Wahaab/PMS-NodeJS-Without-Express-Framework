/*var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require('fs');
var dl = require("./download_client");
var server = require("./server");


function khol(file_name)
{
 var conn = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
conn.once('open',function(){

    var file = file_name;

    var gfs = Grid(conn.db, mongoose.mongo);
        var readstream = gfs.createReadStream (
        {
        filename: file
        });

    var path = 'C:/AMD/' + file;
    var o = '1';
    while (o == '1')
    {
    readstream.on("data",function(chunk)
    {
        fs.appendFile(path, chunk, function(err)
        {
            //console.log('Download Successful');
            //download(chunk, 'bar1');
        });

    });
        console.log('success');

        o = '0';

        server.start("", " ", " ",file_name )

    }



});
}
exports.khol=khol
;
    */