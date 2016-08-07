    io = require("socket.io").listen(1337);

    function socky_emit()
    {



io.sockets.on("connection", function(socket) {

console.log("i_O socket_connection AACCTIVEEE");
        socket.emit("nameSet", {userName: "userName"});

    socket.on('my other event', function (data) {
        console.log(data);
    });



});


}


    exports.socky_emit= socky_emit;

