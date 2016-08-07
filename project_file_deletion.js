var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1/test');

db.once('open', function()
{
    var schema = new mongoose.Schema(
        {
            files: {type: Array}
        });

    var projects = db.model('projects',schema);

    var file_to_be_deleted = 'here put the entry to be deleted';

    projects.findOne({name: 'project 1'}, function(err, projects)
    {
        for (var i=0; i<projects.files.length; i++)
        {
            if (projects.files[i]===file_to_be_deleted)
            {
                projects.files.splice(i,1);
                i--;
            }
        }
        projects.save();
        console.log('file removed from project');
    });
});