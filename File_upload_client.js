/**
 * Created by WahaabJB on 18/01/14.
 */

var filesUpload = null;
var file = null;
var send = false;

$(document).ready(function() {

//    $('#fileUpload').click(function(){
//
//    });


//    setTimeout(function(){
//        alert('adawd');
//        $('#fileUpload2').click();
//    }, 5000);


    $('#fileUpload').click(function(){
        $(this).hide();
//        alert('File Uploaded Successfully');

//        $('#fileUpload2').show();

        console.log ("button is clickeddd");
        sendFile();
    });


    filesUpload = document.getElementById('testClickToUpload');
    filesUpload.addEventListener('change', fileHandler, false);

});

function fileHandler(e)
{
    var files = e.target.files;

        //|| e.dataTransfer.files;

    if (files) {
        //send only the first one
        file = files[0];
    }
}


function sendFile() {


    if (file) {


        //read the file content and prepare to send it
        var reader = new FileReader();

        reader.onload = function(e) {
            console.log("jijd");
            console.log('Sending file...');
            //get all content
            var buffer = e.target.result;



                    //send the content via socket

            console.log(" file name is "+ file.name + " buffer = " + buffer);
            var socket = io.connect("http://localhost:1338");
            socket.on("conn established", function(){

                console.log(" com developed");



            });



            socket.emit('send-file', file.name, buffer);

            alert('File Uploaded Successfully');
            $('#fileUpload2').show();
            $('#fileUpload2').focus();
//            $('#fileUpload').click(function(){
//                $('#fileUpload2').click();
//            });


        };
        reader.readAsBinaryString(file);

    }

}









