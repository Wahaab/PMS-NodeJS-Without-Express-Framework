/**
 * Created by WahaabJB on 19/01/14.
 */
/*
var fs = require('fs');
var url = require('url');
var http = require('http');
var path = require('path');
var mime = require('mime');



function dl_client(request, res)
{
    a = res;
}

function download_client(file_name)
{


    var file = 'C:/AMD'+ file_name;

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    a.setHeader('Content-disposition', 'attachment; filename=' + filename);
    a.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(a);


}

exports.dl_client= dl_client;
exports.download_client = download_client
    */