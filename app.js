/*var mongoose = require('mongoose');
var crypto = require('crypto');
var fss = require('fs');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
db.once('open',function(){



   var loginschema = new mongoose.Schema(
        {
            username: {type: String, unique: true},
            password: {type: String},
            accesstype: {type: Number}
        });
    var mama = db.model('mama',loginschema);

   /* var user1 = new mama(
        {
            username: 'jason',
            password: 'jason1234',
            accesstype: '2'
        });*/

//    user1.save();

/*
    var mongooseschema = new mongoose.Schema({
         firstname: String,
         lastname: String,
         username: String
     });

var mathpeeps = db.model('mathpeeps', mongooseschema);

mathpeeps.find({}, function(err, mathpeeps){
    console.log(mathpeeps);

});
/*    mathpeeps.find({lastname:'bond'}, function(err, mathpeep){
        console.log(mathpeep);
    });*/


/*var testentry = new mathpeeps(
    {firstname: 'jh' , lastname:'sp', username:'ja'});

testentry.set();*/

//});