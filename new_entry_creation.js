var mongoose = require('mongoose');

var io = require("socket.io").listen(1337);

var dataa = '';

function project_data()
{
    io.sockets.on("connection", function(socket)
    {
        var db = mongoose.createConnection('mongodb://127.0.0.1/test');

        db.once('open', function()
        {
           //////////////////////////////////////////////Get Project- table
              var schema = new mongoose.Schema(
                {
                    name: {type: String},
                    status: {type: String},
                    department: {type: String},
                    endDate: {type: Date , default: Date.now},
                    startDate: {type: Date , default: Date.now},
//            Project_Leader: {type: String},
                    budget: {type: Number}
                });

            var projects = db.model('projects',schema);

            projects.find({},function(err, projects)
            {

                socket.emit("Project_Data_Retrieve", projects)
                    });
            //////////////////////////////////////////////Get Project- table


            //////////////////////////////////////////////Get Task- table
            var task_schema = new mongoose.Schema(
                {
                    name: {type: String},
                    status: {type: String},
                    department: {type: String},
                    endDate: {type: Date , default: Date.now},
                    startDate: {type: Date , default: Date.now},
                    leader: {type: String},
                    // The next extries will open by right clicking on a single task
                    project: {type: [String]},
                    files: {type: [String]},
                    user: {type: [String]}

                });

            var tasks = db.model('tasks',task_schema);

            tasks.find({},function(err,tasks)
            {
                //send this tasks as this is the iterable object
                socket.emit("Task_Data_Retrieve", tasks)

            });
            //////////////////////////////////////////////Get Task- table

            //////////////////////////////////////////////Get User- table
            var user_schema = new mongoose.Schema(
                {
                    name: {type: String},
                    department: {type: String},
                    designation: {type: String},

                    project: {type: Array},
                    task: {type: Array},
                    files: {type: Array}
                });

            var users = db.model('users',user_schema);

            users.find({},function(err,users)
            {
                socket.emit("User_Data_Retrieve", users)

            });
            //////////////////////////////////////////////Get User- table

            //////////////////////////////////////////////Get Files- table
            var file_schema = new mongoose.Schema(
                {
                    name: {type: String},
                    owner: {type: String},
                    // The next entries will open by right clicking on a single project file
                    project: {type: Array},
                    task: {type: Array},
                    user: {type: Array}
                });

            var fs_files = db.model('fs.files',file_schema);

            fs_files.find({},function(err,files)
            {

                socket.emit("File_Data_Retrieve", files)
            });
            //////////////////////////////////////////////Get Files- table
        });

        });

}

exports.project_data= project_data;
