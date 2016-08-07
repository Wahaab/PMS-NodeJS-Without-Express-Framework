var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1/test');

db.once('open', function()
{
    var schema = new mongoose.Schema(
        {
            user: {type: Array},
            task: {type: Array},
            files: {type: Array}
        });


    var projects = db.model('projects',schema);
    var project_name = 'project 1';
    var newuser = ['enter new users to be added, otherwise leave it empty array'];
    var newtask = ['enter new tasks to be added, otherwise leave it empty array'];
    var newfile = ['enter new files to be added, otherwise leave it empty array'];

    projects.findOne({name: project_name}, function(err, projects)
    {
        projects.user = projects.user.concat(newuser);
        projects.task = projects.task.concat(newtask);
        projects.files = projects.files.concat(newfile);
        projects.save();

        console.log('entry saved successfully');
    });

});