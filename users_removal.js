var mongoose = require('mongoose');
var table_project = require("./new_entry_creation");
var request_handler = require("./requestHandlers");

function users_removal(user_name, response)
{
    var db = mongoose.createConnection("mongodb://127.0.0.1:27017/test");
    db.once('open', function()
    {

        /////////////// Deleting a user from users' collection //////////////////

        var schema = new mongoose.Schema(
            {});

        var users = db.model('users',schema);

        users.remove({users: user_name},function()
        {
            console.log('user removed from users collection');

        });

        ///////////// Deleting the user from users array of tasks //////////////

        var tasksschema = new mongoose.Schema(
            {
               user: {type: Array}
            });

        var tasks = db.model('tasks',tasksschema);

        tasks.findOne({user: user_name}, function(err, tasks)
        {
            if (tasks !=  null)
            {
            for (var i=0; i<tasks.user.length; i++)
            {
                if (tasks.user[i] == user_name)
                {
                    tasks.user.splice(i,1);
                }
            }
            tasks.save();
            }
                console.log('user removed from tasks collection');

        });


        //////////// Deleting the user from the users array of files ///////////

        var filessschema = new mongoose.Schema(
            {
                user: {type: Array}
            });

        var files = db.model('files',filessschema);

        files.findOne({user: user_name}, function(err, files)
        {
            if (files != null)
            {
            for (var i=0; i<files.user.length; i++)
            {
                if (files.user[i] == user_name)
                {
                    files.user.splice(i,1);
                }
            }
            files.save();
            }
                console.log('user removed from files collection');


        });

        /////////////Deleting user from logins collection/////////

        var schemalogins = new mongoose.Schema(
            {
                name: String
            });

        var logins = db.model('logins',schemalogins);

        logins.remove({name: user_name}, function()
            {
                console.log(user_name);
              console.log("user removed from logins collection");
            });

        request_handler.start_2_2(response,"" ,"");
//        request_handler.start_2_2(response,"" ,table_project.project_data());

    });

}

exports.users_removal = users_removal;