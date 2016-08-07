/**
 * Created by faizankhan on 11/30/13.
 */

var globalTotalProjectRecords;
var globalTotalTaskRecords;
var globalTotalFileRecords;
var globalTotalUserRecords;


$(document).ready(function() {


    var socket2 = io.connect("http://localhost:1337");

    socket2.emit('Project_Data_Get');

    socket2.on("Project_Data_Retrieve", function(data) {

        globalTotalProjectRecords = data;

        console.log(data);
    });

    socket2.on("Task_Data_Retrieve", function(data) {

        globalTotalTaskRecords = data;

        console.log(data);
    });

    $("#project-popover").click(function(e){

//        $('.project-status-visibility-control').css('visibility','hidden');
        $('.project-status-visibility-control').hide();
//        $('.project-status-visibility-control').hide();
//        $('#project-budget').addClass('pull-left');

        $('#new-project-modal-form').modal({
            show    : true,
            backdrop: false
        });

        e.stopPropagation();
    });

    $("#task-popover").click(function(e){

        var arr = [];

        for(var i in globalTotalProjectRecords)
        {
            arr.push(globalTotalProjectRecords[i].name);
        }

        var sel = $('#taskProject');
        var projectSelectOption;

        $(arr).each(function(key, val)
        {
            projectSelectOption += '<option>' + val + '</option>';
        });

        sel.html(projectSelectOption);


        $('#new-task-modal-form').modal({
            show    : true,
            backdrop: false
        });

        e.stopPropagation();
    });

    $("#file-popover").click(function(e){

        getTaskList();
        $('#new-file-modal-form').modal({
            show    : true,
            backdrop: false
        });

        e.stopPropagation();
    });

    $("#user-popover").click(function(e){

        $('#user-project').css('visibility','hidden');

        $('#new-user-modal-form').modal({
            show    : true,
            backdrop: false
        });

        e.stopPropagation();
    });

//    var $projectPopover = $(".project-popover-buttons");
//    var $taskPopover = $(".task-popover-buttons");
//    var $filePopover = $(".file-popover-buttons");
//    var $userPopover = $(".user-popover-buttons");
//
//    $('#project-popover').popover({animation:true, content:$projectPopover, html:true});
//    $('#task-popover').popover({animation:true, content:$taskPopover, html:true});
//    $('#file-popover').popover({animation:true, content:$filePopover, html:true});
//    $('#user-popover').popover({animation:true, content:$userPopover, html:true});

    $('#new-project-active-tab').tab('show');
    $('#new-task-active-tab').tab('show');
    $('#new-file-active-tab').tab('show');
    $('#new-user-active-tab').tab('show');

    $('#info-project-active-tab-in-project').tab('show');
    $('#info-task-active-tab-in-task').tab('show');
    $('#info-file-active-tab-in-file').tab('show');
    $('#info-user-active-tab-in-user').tab('show');

    $('#new-project-modal-form').modal({
        show    : false,
        backdrop: false
    });
    $('#new-task-modal-form').modal({
        show    : false,
        backdrop: false
    });
    $('#new-file-modal-form').modal({
        show    : false,
        backdrop: false
    });
    $('#new-user-modal-form').modal({
        show    : false,
        backdrop: false
    });
    $('#confirmation-modal-form').modal({
        show    : false,
        backdrop: false
    });

    $('#getToClickRealButton').click(function(){
        $('#testClickToUpload').click();
    });

    $('#testClickToUpload').change(function(){
        $('#showFileInHere').val($(this).val().split('\\').pop());
    });

});

function getTaskList()
{
    var arr = [];

    for(var i in globalTotalTaskRecords)
    {
        arr.push(globalTotalTaskRecords[i].name);
    }

    var sel = $('#fileTask');
    var projectSelectOption;

    $(arr).each(function(key, val)
    {
        projectSelectOption += '<option>' + val + '</option>';
    });

    sel.html(projectSelectOption);

}