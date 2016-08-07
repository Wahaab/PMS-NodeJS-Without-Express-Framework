var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require('fs');

var files_tab_entries= require("./files_tab_entries");



function upload_server(name, response, global_user, task)
{
    console.log(" $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" +  task);


var conn = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

conn.once('open',function(){

     var gfs = Grid(conn.db, mongoose.mongo);

     var file = name;
     var path = 'C:/AMD/' + file;

     var writestream = gfs.createWriteStream({
     filename: file,
     mode: 'w'
     });
     fs.createReadStream(path).pipe(writestream);

     writestream.on('close',function(file)
     {
     console.log('file uploaded successfully');

         fs.readFile('index.html', function(err,data){

             console.log(" oh bc!");
             response.write(data);
             response.end();


             files_tab_entries.files_tab_entries(name,global_user, task);
         });
     });
});



}

exports.upload_server=upload_server;