///*var mongoose = require('mongoose');
//
//var io = require("socket.io").listen(1339);
//var khol= require("./file_downloading_server");
//
//
//function project_three_entries_retrieval()
//{
//    io.sockets.on("connection", function(socket) {
//
//        console.log("bhai jee mein bhi mein bhi mein bhi noiaoijoiejioja");
//
//        socket.on('Request_Three_Objects', function (selectedRowProject)
//        {
//
//            var db = mongoose.createConnection('mongodb://127.0.0.1/test');
//
//            db.once('open', function()
//            {
//                var schema = new mongoose.Schema(
//                    {
//                        user: {type: Array},
//                        task: {type: Array},
//                        files: {type: Array}
//                    });
//
//
//                var projects = db.model('projects',schema);
//                var project_name = selectedRowProject;
//
//                projects.findOne({name: project_name}, function(err, projects)
//                {
//                    //send these three values further
//                    socket.emit("Three_Objects_Receive", projects.task,projects.user)
//                });
//
//
//            });
//
//        });
//
//        socket.on("Download_file", function(file_name)
//        {
//            console.log( "khul gaey hai janab :D");
//            khol.khol(file_name);
//        });
//
//
//
//        });
//
//}
//
//exports.project_three_entries_retrieval=project_three_entries_retrieval;