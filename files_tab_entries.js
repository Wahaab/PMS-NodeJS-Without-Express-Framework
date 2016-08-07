var mongoose = require('mongoose');
var fileschema;


function files_tab_entries(file_name,user_name,task)
{
    console.log(" the value f task is "+ task);

var db = mongoose.createConnection('mongodb://127.0.0.1/test');
db.once('open', function()
{

/////// Saving filename in our own created files collection along with other information////

    var schema = new mongoose.Schema(
        {
            name: {type: String},
            owner: {type: String},
            task: {type: Array},
            user: {type: Array}
        });

    var files = db.model('files',schema);
    fileschema = files;
    var new_entry = new files(
        {
            name: file_name,
            owner: user_name
        });

    new_entry.save();

});

///////////// This step stores the taskname in the files' collection 'task' array ////////////
    ///////// Also, user name is stored in files' collection 'user' array ///////////

db = mongoose.createConnection('mongodb://127.0.0.1/test');
db.once('open', function()
    {


    fileschema.findOne({name: file_name}, function(err, file)
    {
        console.log(file);
        file.task = file.task.concat(task);
        file.user = file.user.concat(user_name);
        file.save();
        console.log('entry saved successfully');
    });


///////////// This step will store the file name in the tasks' collection 'files' array /////////

    var tasksschema = new mongoose.Schema(
        {
            files: {type: Array}
        });

    var tasks = db.model('tasks',tasksschema);

    tasks.findOne({name: task}, function(err, tasks)
    {

       tasks.files = tasks.files.concat(file_name);
       tasks.save();
    });

//////////////////// And we are done ////////////////////////

});

}

exports.files_tab_entries = files_tab_entries;