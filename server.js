/**
 * Created by WahaabJB on 15/12/13.
 */

var http = require("http");
var url = require("url");
var path = require ('path');
var qs = require('querystring');
var dl = require("./download_client");


function start(route, handle, mime_types)
{
    var i=0;
    function onRequest(request, response)
    {
        var query_string = url.parse(request.url).query;
        var pathname = url.parse(request.url).pathname;
        var file_ext = path.extname(pathname);



console.log(query_string+"     =    "  +handle["delete_User"]+ "  =   " + pathname);

            route(handle, pathname, file_ext, response, mime_types, query_string, request);


    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");

}

//

exports.start = start;