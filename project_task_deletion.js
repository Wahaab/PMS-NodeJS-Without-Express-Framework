var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1/test');

db.once('open', function()
{
    var schema = new mongoose.Schema(
        {
            task: {type: Array}
        });

    var projects = db.model('projects',schema);

    var task_to_be_deleted = 'here put the task to be deleted';

    projects.findOne({name: 'project 1'}, function(err, projects)
    {
        for (var i=0; i<projects.task.length; i++)
        {
            if (projects.task[i]===task_to_be_deleted)
            {
                projects.task.splice(i,1);
                i--;
            }
        }
        projects.save();
        console.log('task removed from project');
    });
});