var mongoose = require('mongoose');
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
            budget: {type: Number},
            // The next entries will open by right clicking on a single project file
            user: {type: Array},
            task: {type: Array},
            files: {type: Array}
        });


    var projects = db.model('projects',schema);

    var new_entry = new projects(
        {
            name: 'project 1',
            status: 'complete',
            department: 'fh kiel',
            endDate: '01 Jan 2011',
            startDate: '30 April 2012',
            budget: '300',
            user:['user 1','user 2'],
            task:['task 1','task 2', 'task 3'],
            files:['file 1']
        });

    new_entry.save();
    console.log('entry saved successfully');
});