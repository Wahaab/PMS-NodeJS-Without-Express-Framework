/** Created by WahaabJB on 15/12/13. **/

var fs = require('fs');
var qs = require('querystring');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var mime= require('mime');

var L_I = require("./loginauth");
var registerUser= require("./register");

var new_pr = require("./New_Project_entry");
var projectEdit = require("./project_entry_update");
var projectRemove= require("./project_removal");

var task_tab= require("./tasks_tab_entries");
var task_removal = require("./task_removal");

var delete_File = require("./file_removal");

var delete_User = require("./users_removal");

var sup = require('./file_uploading_server');

var users_removal = require("./users_removal")

var file_name_received;
var uploadFile_name;
var uploadFile_buffer;

var global_user;
var task;
var io  = require("socket.io").listen(1339);
var to  = require("socket.io").listen(1338);


function file_name_listener()
{
    io.sockets.on("connection", function(socket)
    {
        socket.on("Download_file", function(file_name)
        {
            file_name_received =file_name;

            socket.emit("File_received");

        });
    });
}

function fileUpload_listener()
{
    console.log("function fileUpload_listener() called")

    to.sockets.on('connection', function(socket)
    {
        console.log(" to.sockets.on('connection' called");

        socket.on('send-file',function(name, buffer)
        {
            console.log ("socket.on('send-file' = " +name);

            uploadFile_name=name;
            uploadFile_buffer=buffer;



        });
    });

}


//console.log(io);

////////////////////////////////////////////////////////////////////Function_Start/////////////////////////////////////
function start(response, request) {
    console.log("Request handler 'start' was called.");

    if(request)
    {
        var rc = request.headers.cookie;
    }

    if(rc)
    {
        L_I.LOGIN("", "","", response, rc);
    }

    else
    {
    response.writeHead(200, {"Content-Type": "text/html"});

    fs.readFile('Login.html', function(err,data){
        response.write(data);
        response.end();

      });
    }
}
//////////////////////////////////////////////////////////////////////Function_Start/////////////////////////////////////

//////////////////////////////////////////////////////////////////////Function_Start_2/////////////////////////////////////
function start_2(response, request) {

    if(request.method== "POST")
    {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function ()
        {
            body = qs.parse(body);

            global_user=body.User_Name;

            L_I.LOGIN(body.User_Name,  body.Password, body.checkBox, response);
        });
    }
    else
    {
        var rc = request.headers.cookie;
        if(rc)
        {
            L_I.LOGIN("","","", response, rc);
        }
        else
        {
            start(response);
        }
    }
}
//////////////////////////////////////////////////////////////////////Function_Start_2/////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////Function_Start_2_2/////////////////////////////////////

function start_2_2(response, user, funct, checkBox) {

    if(checkBox)
    {
    var currentdate = new Date();
    currentdate.setHours(currentdate.getHours()-1);
    currentdate.setMinutes(currentdate.getMinutes()+1);
    }

    else
    {
        var currentdate = new Date();
        currentdate.setHours(currentdate.getHours()-2);
        currentdate.setMinutes(currentdate.getMinutes()+1);
    }

    if (user)
    {
       response.writeHead(200, {'Set-Cookie': user+';expires='+currentdate+';', "Content-Type": "text/html"});
    }

   if(funct)
   {
       funct();
   }

    fs.readFile('index.html', function(err,data){

        response.write(data);
        response.end();
    });
}
//////////////////////////////////////////////////////////////////////Function_Start_2_2/////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////Function sign_out/////////////////////////////////////
function sign_out(response, request)
{
    var currentdate = new Date();
    currentdate.setHours(currentdate.getHours()-3);

    var rc = request.headers.cookie;
    if(rc)
    {
        response.writeHead(200, {'Set-Cookie': rc+';expires='+currentdate+';', "Content-Type": "text/html"});
    }

    fs.readFile('Login.html', function(err,data){
        response.write(data);
        response.end();

    });
}

//////////////////////////////////////////////////////////////////////Function sign_out/////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////Function Register/////////////////////////////////////

function Register(response, request)
{
    if(request.method== "POST")
    {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function ()
        {
            body = qs.parse(body);

            console.log(body);

            registerUser.register_user(body.User_Name, body.User_Mail,body.User_Pass, response)  ;

        });

    }
}

function deleteUser(response, request)
{

    if(request.method== "POST")
    {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function ()
        {
            body = qs.parse(body);

           // console.log("jarayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyjajaaaaaaaaaaaaaaaaaaaaaaa   "+ body.task);

            users_removal.users_removal(body.user,response);

        });
    }

}


//////////////////////////////////////////////////////////////////////Function Register/////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////Function new_Project/////////////////////////////////////
//
function new_Project( response, request   )
{
    if(request.method== "POST")
    {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function ()
        {
            body = qs.parse(body);

            new_pr.new_project_enter(body.project_Name, body.project_Department, body.project_StartDate, body.project_EndDate, response);
        });
    }
}

//////////////////////////////////////////////////////////////////////Function new_Project/////////////////////////////////////
//
//
//////////////////////////////////////////////////////////////////////Function edit_Project/////////////////////////////////////

function edit_Project(response, request)
{
    if(request.method== "POST")
    {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function ()
        {
            body = qs.parse(body);

           projectEdit.projectEdit(body.project_Name, body.project_Department, body.project_StartDate, body.project_EndDate, response);

        });
    }

}


//////////////////////////////////////////////////////////////////////Function edit_Project/////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////Function delete_Project/////////////////////////////////////

function delete_Project(response, request)
{
        if(request.method== "POST")
    {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function ()
        {
            body = qs.parse(body);

            console.log("jarayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyjajaaaaaaaaaaaaaaaaaaaaaaa   "+ body.aba);

            projectRemove.project_removal(body.aba, response)
          //  projectEdit.projectEdit(body.project_Name, body.project_Department, body.project_StartDate, body.project_EndDate, response);

        });
    }

}


//////////////////////////////////////////////////////////////////////Function delete_Project/////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////Function new_Task/////////////////////////////////////
//
function new_Task(response, request)
{
    if(request.method== "POST")
    {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function ()
        {
            body = qs.parse(body);



            task_tab.tasks_tab_entries(body.taskName, body.taskDepartment, body.taskStartDate, body.taskEndDate, body.taskProject, body.task_Description, response);
        });
    }
}

//////////////////////////////////////////////////////////////////////Function new_Task/////////////////////////////////////
//
//

//////////////////////////////////////////////////////////////////////Function delete_Task/////////////////////////////////////
//

function delete_Task(response, request)
{
    if(request.method== "POST")
    {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function ()
        {
            body = qs.parse(body);

            console.log("jarayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyjajaaaaaaaaaaaaaaaaaaaaaaa   "+ body.task);

            task_removal.task_removal(body.task,response);
        });
    }




}

//
//
//////////////////////////////////////////////////////////////////////Function ext_interpreter/////////////////////////////////////
//
function ext_interpreter(response, pathname, mime_type)
{

    response.writeHead(200, {"Content-Type": mime_type});

    var Path_of_file = __dirname + pathname;

     fs.readFile(Path_of_file, function(err,data)
    {
            response.write(data);
            response.end();
    });
}


//////////////////////////////////////////////////////////////////////Function ext_interpreter/////////////////////////////////////

//////////////////////////////////////////////////////////////////////Function file_downloader/////////////////////////////////////

function downloader(response, request)
{

    console.log("downloader called");

            var conn = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
            conn.once('open',function(){

                var file = file_name_received;

                console.log(file);

                var gfs = Grid(conn.db, mongoose.mongo);
                var readstream = gfs.createReadStream (
                    {
                        filename: file
                    });

                var path = 'C:/AMD/' + file;

                    readstream.on("data",function(chunk)
                    {
                        fs.appendFile(path, chunk, function(err)
                        {
                            //console.log('Download Successful');
                            //download(chunk, 'bar1');
                        });

                    });

                    readstream.on("end", function()
                    {
                        console.log('success');


                        var file = 'C:/AMD/'+ file_name_received;

                        //  var filename = path.basename(file);
                        var mimetype = mime.lookup(file);

                        response.setHeader('Content-disposition', 'attachment; filename=' + file_name_received);
                        response.setHeader('Content-type', mimetype);

                        var filestream = fs.createReadStream(file);
                        filestream.pipe(response);
                    });


            });
}
//////////////////////////////////////////////////////////////////////Function file_downloader/////////////////////////////////////

//////////////////////////////////////////////////////////////////////Function file_uploader/////////////////////////////////////

function fileUpload(response, request)
{
    var body="";
    console.log ("  File_upload request received ");
    if(request.method== "POST")
    {
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function ()
        {
            body = qs.parse(body);
            task=body.task;

            console.log(" ________________________" + task);

    if(uploadFile_buffer)
    {

        console.log(uploadFile_buffer + "  called at first_attempt     " + uploadFile_name);
        var path= "C:/AMD/"+uploadFile_name;


        fs.open(path, 'a', 0755, function(err, fd) {
            if (err) throw err;

            fs.write(fd, uploadFile_buffer, null, 'Binary', function(err, written, buff) {
                fs.close(fd, function() {
                    console.log('File saved successful!');

                    sup.upload_server(uploadFile_name, response, global_user,task);



                });
            })
        });
    }

    else
    {

        console.log(uploadFile_buffer + "  called at second_attempt     " + uploadFile_name);

        setTimeout(function(){var path= "C:/AMD/"+uploadFile_name;


            var path= "C:/AMD/"+uploadFile_name;


            fs.open(path, 'a', 0755, function(err, fd) {
                if (err) throw err;

                fs.write(fd, uploadFile_buffer, null, 'Binary', function(err, written, buff) {
                    fs.close(fd, function() {
                        console.log('File saved successful!' + task);

                        sup.upload_server(uploadFile_name, response, global_user, task);



                    });
                })
            });},3000)
        }


        });

   }
 }

//////////////////////////////////////////////////////////////////////Function file_uploader/////////////////////////////////////

//////////////////////////////////////////////////////////////////////Function file_deleter/////////////////////////////////////


function deleteFile(response,request)
{
    if(request.method== "POST")
    {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function ()
        {
            body = qs.parse(body);

            console.log("jarayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyjajaaaaaaaaaaaaaaaaaaaaaaa   "+ body.task);

            delete_File.file_removal(body.file, response);

        });
    }


}

//////////////////////////////////////////////////////////////////////Function file_deleter/////////////////////////////////////



exports.start = start;
exports.start_2 = start_2;
exports.start_2_2= start_2_2;


exports.sign_out = sign_out;
exports.Register= Register;

exports.new_Project= new_Project;
exports.edit_Project= edit_Project;
exports.delete_Project=delete_Project;

exports.new_Task=new_Task;
exports.delete_Task= delete_Task;

exports.downloader= downloader;

exports.ext_interpreter = ext_interpreter;

exports.file_name_listener=file_name_listener;
exports.fileUpload_listener= fileUpload_listener;

exports.fileUpload=fileUpload;
exports.deleteFile=deleteFile;

exports.deleteUser=deleteUser;