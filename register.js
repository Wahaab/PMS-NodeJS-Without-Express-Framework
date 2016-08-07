var mongoose = require('mongoose');

var fs = require('fs');


function register_user(name, email, pass, response)
{
    var db = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

    console.log("dsoksdds");

db.once('open',function()
{
    console.log("dsoksdds_PART2");


    var newname = name;
    var newpassword = pass;
    var newemail = email;

    var schema = new mongoose.Schema({

        name: {type: String},
        password: {type: String},
        email: {type: String}
    });

    var logins = db.model('logins',schema);

    logins.findOne({email:newemail}, function(err, login)
    {
        console.log(login);
       if (login != null)
       {
           console.log ('email already exists');
           response.write('email already exists');
       }
       else if (login == null)
       {
           var new_user = new logins(
               {
                   name: newname,
                   password: newpassword,
                   email: newemail,
                   accesssep: 'employee'
               });
            new_user.save();

      /////////// adding user details in 'users' collection //////////

           var uschema = new mongoose.Schema(
               {
                  name: {type: String},
                  department: {type: String},
                  designation: {type: String},
                  role: {type: String}
               });

           var userscoll = db.model('users',uschema);

           var newusercoll = new userscoll(
           {
               name: name,
               department: 'IT',
               designation: 'employee',
               role: 'user'
           });

           newusercoll.save();
           console.log('success');

           fs.readFile('Login.html', function(err,data){
               response.write(data);
               response.end();
              });
       }

    });

});

}

exports.register_user=register_user;