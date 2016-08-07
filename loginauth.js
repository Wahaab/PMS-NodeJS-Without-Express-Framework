var mongoose = require('mongoose');
var Req_Han = require("./requestHandlers");

function LOGIN(user, pass, checkBox, response, cookie)
{

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

    db.once('open',function()
    {
console.log("login_auth");
    var schema = new mongoose.Schema({

    username: {type: String},
    password: {type: String},
    accesstype: {type: Number}
    });


    var login = db.model('login',schema);

        if(cookie)
        {
            login.findOne({username: cookie},function(err,login)
            {

                if (err)
                {
                    console.dir(err);
                }

                Req_Han.start_2_2(response);

                mongoose.disconnect();
            });

        }

        else{
    login.findOne({email: user},function(err,login)
        {

            if (err)
            {
                console.dir(err);
            }

            else if (login!=null && pass===login.password)
            {
                Req_Han.start_2_2(response, user, "", checkBox);
            }

            else if (login!=null && pass!==login.password)
            {

                Req_Han.start(response);
            }

            else if (login==null)
            {
                Req_Han.start(response);
            }

           // mongoose.disconnect();
        });
        }

});


}
exports.LOGIN= LOGIN;