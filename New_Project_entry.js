/*** Created by WahaabJB on 17/01/14.*/

var mongoose = require('mongoose');
var table_project = require("./new_entry_creation");
var request_handler = require("./requestHandlers");

function new_project_enter(pr_name, dept, st_date, end_date, response)
{

var db = mongoose.createConnection('mongodb://127.0.0.1/test');

db.once('open', function()
{
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    var schema = new mongoose.Schema(
        {
            name: {type: String},
            status: {type: String},
            department: {type: String},
            endDate: {type: Date , default: Date.now},
            startDate: {type: Date , default: Date.now},
            budget: {type: Number},
            description: {type: String},
            // The next entries will open by right clicking on a single project file
            user: {type: Array},
            task: {type: Array},
            files: {type: Array}
        });

    var projects = db.model('projects',schema);


  var new_entry = new projects(
 {

 name: pr_name,
 status: 'pending',
 department: dept,
 endDate: end_date,
 startDate: st_date,
 //Project_Leader: 'John Smith',
 budget: '500',
     description: '',
     user:[],
     task:[],
     files:[]
 });

 new_entry.save();

    request_handler.start_2_2(response," " ,table_project.project_data());


 console.log('entry saved successfully');


});

}

exports.new_project_enter= new_project_enter;