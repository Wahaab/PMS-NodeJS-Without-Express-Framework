/**
 * Created by WahaabJB on 18/01/14.
 */
//var io  = require("socket.io").listen(1338);
//var fs  = require('fs');
//
//
//function fileUpoad(response)
//{

//    io.sockets.on('connection', function(socket)
//    {
//
//        console.log("oh bahiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii file_upload call ho gya hai");
//
//
//
//        socket.on('send-file',function(name, buffer)
//        {
//            var path= "C:/AMD/"+name;
//
//
//            fs.open(path, 'a', 0755, function(err, fd) {
//                if (err) throw err;
//
//                fs.write(fd, buffer, null, 'Binary', function(err, written, buff) {
//                    fs.close(fd, function() {
//                        console.log('File saved successful!');
//
//                        sup.upload_server(name, response);
//
//
//
//                    });
//                })
//            });
//
////        });
////        });
//}
//
//exports.fileUpoad=fileUpoad;