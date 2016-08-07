var mongoose = require('mongoose');
var table_project = require("./new_entry_creation");
var request_handler = require("./requestHandlers");

function project_removal(project, response)
{
    var db = mongoose.createConnection('mongodb://127.0.0.1/test');

db.once('open', function()
{
    var schema = new mongoose.Schema(
        {
//            name: {type: String},
//            status: {type: String},
//            department: {type: String},
//            endDate: {type: Date , default: Date.now},
//            startDate: {type: Date , default: Date.now},
//            budget: {type: Number},
//            // The next entries will open by right clicking on a single project file
//            user: {type: Array},
//            task: {type: Array},
//            files: {type: Array}
        });


    var projects = db.model('projects',schema);
    projects.remove({name: project},function()
    {
        console.log('project removed');

        request_handler.start_2_2(response,"" ,table_project.project_data());

    });
});

}

exports.project_removal=project_removal;