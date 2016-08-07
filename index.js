/*** Created by WahaabJB on 15/12/13.*/


var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

//var test= require("./testing");

var project_three_entries_retrieval= require("./project_three_entries_retrieval");

var new_entry_creation = require("./new_entry_creation");




var handle = {

    "/": requestHandlers.start,

    "/index": requestHandlers.start_2,

    "/download": requestHandlers.downloader,

    "/Sign_Out": requestHandlers.sign_out,
    "/register": requestHandlers.Register,
    "/delete_User": requestHandlers.deleteUser,

    "/file_uploaded": requestHandlers.fileUpload,

    "/new_Project": requestHandlers.new_Project,
    "/project_Edit": requestHandlers.edit_Project,
    "/deleteProject": requestHandlers.delete_Project,

    "/new_Task": requestHandlers.new_Task,
    "/delete_Task": requestHandlers.delete_Task,

    "/delete_File":requestHandlers.deleteFile,



    ".html": requestHandlers.ext_interpreter,
    ".css": requestHandlers.ext_interpreter,
    ".js": requestHandlers.ext_interpreter,
    ".png": requestHandlers.ext_interpreter,
    ".gif": requestHandlers.ext_interpreter,
    ".jpg": requestHandlers.ext_interpreter,
    ".woff": requestHandlers.ext_interpreter,
    ".ttf": requestHandlers.ext_interpreter,
    ".svg": requestHandlers.ext_interpreter,
    ".json": requestHandlers.ext_interpreter


};

var mime_types = {

    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".woff": "application/font-woff",
    ".ttf": "application/x-font-ttf",
    ".svg": "image/svg+xml",
    ".json": "application/json"

};
;

server.start(router.route, handle, mime_types);

new_entry_creation.project_data();



requestHandlers.file_name_listener();
requestHandlers.fileUpload_listener();


//project_three_entries_retrieval.project_three_entries_retrieval();

//onlineUser.onlineUsers();

