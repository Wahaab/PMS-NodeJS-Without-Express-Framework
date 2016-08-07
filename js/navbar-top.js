/**
 * Created by faizankhan on 11/30/13.
 */

$(document).ready(function() {

    $('#clickToCatch').click(function(){
        $('#testClickImageUpload').click();
    });
    $('#user-profile-pic-in-modal').click(function(){
        $('#testClickImageUpload').click();
    });


    $('#user-profile').click(function(){
        getUserProfile();
    });

    $('#notifications').tooltip({
        placement: 'bottom'
    });
    $('#users-online').tooltip({
        placement: 'bottom'
    });
    jQuery('.popbox').popbox();

    $("#test-drop-down li a").click(function(e){

        var selText = $(this).text();
        $(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');

        switch (selText)
        {
            case 'Projects':
                $('#projects-tab').tab('show');
                break;
            case 'Tasks':
                $('#tasks-tab').tab('show');
                break;
            case 'Files':
                $('#files-tab').tab('show');
                break;
            case 'Users':
                $('#users-tab').tab('show');
                break;
            case 'All':
                break;
        }
    });
});

function getUserProfile()
{
    $('#user-profile-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
