/**
 * Created by faizankhan on 11/30/13.
 */

$(document).ready(function() {
    var dummyUsersList = [
        {
            name: 'user1',
            password: 'user_password_1',
            email: 'user_email_id_1@gmail.com'
        },
        {
            name: 'user2',
            password: 'user_password_2',
            email: 'user_email_id_2@gmail.com'
        },
        {
            name: 'user3',
            password: 'user_password_3',
            email: 'user_email_id_3@gmail.com'
        },
        {
            name: 'user4',
            password: 'user_password_4',
            email: 'user_email_id_4@gmail.com'
        }
    ]

    $('.form-signin').validate({
        rules : {
            loginpassword : {
                minlength : 5
            }
        }
    });

    $('.form-register').validate({
        rules : {
            password : {
                minlength : 5
            },
            password_confirm : {
                equalTo : "#password"
            }
        }
    });

//    $('#user-name').focusout(function(){

//        alert('oaknsd');

//    });













//    $('#retyped-password').keyup(function(){
//
//        var retypedPasswordField = $(this).val();
//        if(retypedPasswordField)
//        {
//            var myExp = new RegExp(retypedPasswordField, "i");
//            for(var i in dummyUsersList)
//            {
//                if ((dummyUsersList[i].password.search(myExp) == -1))
//                {
//                    alert('Pass')
//                }
//            }
//        }
//    })





});
