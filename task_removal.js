var mongoose = require('mongoose');
var table_project = require("./new_entry_creation");
var request_handler = require("./requestHandlers");

function task_removal(task, response)
{

var db = mongoose.createConnection('mongodb://127.0.0.1/test');

db.once('open', function()
{
    var schema = new mongoose.Schema(
        {

        });


    var tasks = db.model('tasks',schema);

    var task_to_remove = task;

    tasks.remove({name: task_to_remove},function()
    {
        console.log('task removed');
    });


    var schema1 = new mongoose.Schema(
        {
            task: {type: Array}
        });

    var projects = db.model('projects',schema1);

    var task_to_be_deleted = task_to_remove;

    projects.findOne({task: task_to_be_deleted}, function(err, projects)
    {
        if (projects != null)
        {
            for (var i=0; i<projects.task.length; i++)
            {
            if (projects.task[i]===task_to_be_deleted)
            {
                projects.task.splice(i,1);
                i--;
            }
            projects.save();
            }
        }
        request_handler.start_2_2(response,"" ,table_project.project_data());
        console.log('task removed from project');
    });





});
}

exports.task_removal=task_removal;