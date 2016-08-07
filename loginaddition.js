var mongoose = require('mongoose');
var Req_Han = require("./requestHandlers");

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

db.once('open',function()
{

    var schema = new mongoose.Schema({

        username: {type: String},
        password: {type: String},
        accesstype: {type: Number}
    });

        var login = db.model('login',schema);

        var newentry = new login(
        {
            username: 'wahaabj',
            password: 'w1234',
            accesstype: '3'
        });

        newentry.save();
});