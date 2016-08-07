var table_project = require("./new_entry_creation");

var request_handler = require("./requestHandlers");

var mongoose = require('mongoose');

function tasks_tab_entries(taskName, taskDepartment, taskStartDate, taskEndDate, taskProject, taskdescription, response)
{

var db = mongoose.createConnection('mongodb://127.0.0.1/test');

db.once('open', function()
{
    var schema = new mongoose.Schema(
        {
            name: {type: String},
            status: {type: String},
            department: {type: String},
            endDate: {type: Date , default: Date.now},
            startDate: {type: Date , default: Date.now},
            description: {type: String},
            // The next extries will open by right clicking on a single task
            project: {type: Array},
            files: {type: Array},
            user: {type: Array}

        });


    var tasks = db.model('tasks',schema);

    var new_entry = new tasks(
        {
            name: taskName,
            status: 'pending',
            department: taskDepartment,
            endDate: taskEndDate,
            startDate: taskStartDate,
            description: taskdescription,
            project: taskProject,
            files: [],
            user: []

        });

    new_entry.save();

    var projectschema = new mongoose.Schema({

        task: {type: Array}
    });

    var projects = db.model('projects',projectschema);

    projects.findOne({name: taskProject}, function(err, pro)
{
    pro.task = pro.task.concat(taskName);
    pro.save();
});

    request_handler.start_2_2(response);
});
}

exports.tasks_tab_entries=tasks_tab_entries;