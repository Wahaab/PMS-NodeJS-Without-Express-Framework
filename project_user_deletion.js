var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1/test');

db.once('open', function()
{
    var schema = new mongoose.Schema(
        {
         user: {type: Array}
        });

    var projects = db.model('projects',schema);

    var user_to_be_deleted = 'john';

    projects.findOne({name: 'project 1'}, function(err, projects)
    {
        for (var i=0; i<projects.user.length; i++)
        {
            if (projects.user[i]===user_to_be_deleted)
            {
                projects.user.splice(i,1);
                i--;
            }
        }
        projects.save();
        console.log('user removed from project');
    });
});