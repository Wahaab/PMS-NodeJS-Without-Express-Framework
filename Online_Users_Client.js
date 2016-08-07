/**
 * Created by WahaabJB on 20/01/14.
 */

$(document).ready(function()

{

    var socket = io.connect("http://localhost:1339");

    socket.emit('Get_Online_Users');




    $('#users-online strong').text(' 5');


    //$('#users-online').value= 11;


});





/*
var names = ["Mike","wahaab","wahaab","Matt","Nancy","Adam","Jenny","Nancy","Carl"];
var i=0;
var uniqueNames = [];
$.each(names, function(i, el){
    if($.inArray(el, uniqueNames) === -1)
    {
        uniqueNames.push(el);
          i++;
    }

});

console.log(uniqueNames+ "total number of userS::"+uniqueNames.length);
    */
