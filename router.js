/**
 * Created by WahaabJB on 15/12/13.
 */

function route(handle, pathname, file_ext, response, mime_types, query_string, request)
{
    console.log("About to route a request for " + pathname);

    if (typeof handle[pathname] === 'function' )
    {
        handle[pathname](response,request, query_string);
    }

    else if (typeof  handle[file_ext] === 'function')
    {
        handle[file_ext](response, pathname, mime_types[file_ext]);
    }

    else
    {
        console.log("No request handler found for " + pathname);
        // return "404 Not found";

        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}
exports.route = route;