var mongoose = require('mongoose');
var table_project = require("./new_entry_creation");
var request_handler = require("./requestHandlers");


function projectEdit(name, department,startDate, endDate,response)
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
            budget: {type: Number}
        }
    );

      //  var new_status= status;
        var new_department=department;
        var new_endDate=endDate;
        var new_startDate=startDate;
       // var new_budget=budget;

    var projects = db.model('projects',schema);

        projects.findOne({name:name}, function(err, projects)
        {

           // projects.status = new_status;
            projects.department = new_department;
            projects.endDate = new_endDate;
            projects.startDate = new_startDate;
          //  projects.budget = new_budget;

            projects.save();
        })  ;

    request_handler.start_2_2(response,"" ,table_project.project_data());

    console.log('entry saved successfully');
});

}

exports.projectEdit= projectEdit;