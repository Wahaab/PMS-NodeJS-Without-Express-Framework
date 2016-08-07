var mongoose = require('mongoose');
var table_project = require("./new_entry_creation");
var request_handler = require("./requestHandlers");

function file_removal(file_name, response)
{


var db = mongoose.createConnection("mongodb://127.0.0.1:27017/test");
db.once('open',function()
{

////////////////// Deleting files from fs.files collection /////////////////

    var fsfilesschema = new mongoose.Schema({});
    var fsfiles = db.model('fs.files',fsfilesschema);

    fsfiles.remove({filename: file_name},function()
    {
        console.log('file removed from fs.files database');
    });

/////////////// Deleting files from files collection ///////////

    var filesschema = new mongoose.Schema({});
    var files = db.model('files',filesschema);

    files.remove({name: file_name}, function()
    {
       console.log('file removed from files database');
    });

///////////// Deleting files from tasks' collection 'files' array //////////

    var tasksschema = new mongoose.Schema(
        {
            files: {type: Array}
        });

    var tasks = db.model('tasks',tasksschema);

    tasks.findOne({files: file_name}, function(err, tasks)
    {
        if (tasks != null)
        {
        for (var i=0; i<tasks.files.length; i++)
        {
            if (tasks.files[i] == file_name)
            {
                tasks.files.splice(i,1);
            }
        }
            tasks.save();
        }

        console.log('file removed from files array of tasks');
    });

/////////// Deleting files from users' array of 'files' //////////////

    var usersschema = new mongoose.Schema(
        {
            files: {type: Array}
        });

    var users = db.model('users',usersschema);

    users.findOne({files: file_name}, function(err, users)
    {
        if (users != null)
        {
        for (var i=0; i<users.files.length; i++)
        {
            if (users.files[i] == file_name)
            {
                users.files.splice(i,1);
            }
        }
        users.save();
        }
            console.log('file removed from files array of users');
        request_handler.start_2_2(response,"" ,table_project.project_data());

    });

});
}



exports.file_removal = file_removal;