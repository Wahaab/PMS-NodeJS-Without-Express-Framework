/**
 * Created by faizankhan on 11/30/13.
 */

var globalTotalProjectRecords;
var gl_user_projectInfo;
var gl_task_projectInfo;

$(document).ready(function() {

    var socket2 = io.connect("http://localhost:1337");

    socket2.emit('Project_Data_Get');

    socket2.on("Project_Data_Retrieve", function(data) {

        globalTotalProjectRecords = data;

        console.log(data);
    });

    socket = io.connect("http://localhost:1339");

    $("#testing-multiselect-value").click(function(){

//        alert($("#userProjects").val());

        $("#userProjects").multiselect('deselect', $("#userProjects").val());
    });

    var arr = ['One', 'Two', 'Three'];
    var sel = $('#taskProject');
    var projectSelectOption;

    $(arr).each(function(key, val)
    {
        projectSelectOption += '<option>' + val + '</option>';
    });

    sel.html(projectSelectOption);


    //    Context Menu

    var $contextMenu = $("#contextMenu");
    var $rowClicked;

    $("body").on("contextmenu", "table tr", function (e) {
        var currentActiveTab = $('#get-active-tab .active').text();
//        alert(currentActiveTab);


        switch(currentActiveTab)
        {
            case 'Projects':
                $('#contextMenuFileRemoveEdit').html('<a tabindex="-1" href="#"><i class="fa fa-pencil-square-o fa-fw"></i> Edit</a>');
                $('.hidden-file-upload-menu-item').hide();
                break;
            case 'Tasks':
                $('#contextMenuFileRemoveEdit').html('<a tabindex="-1" href="#"><i class="fa fa-pencil-square-o fa-fw"></i> Edit</a>');
                $('.hidden-file-upload-menu-item').show();
                break;
            case 'Files':
                $('#contextMenuFileRemoveEdit').html('<a tabindex="-1" href="#"><i class="fa fa-download fa-fw"></i> Download</a>');
                $('.hidden-file-upload-menu-item').hide();
                break;
            case 'Users':
                $('#contextMenuFileRemoveEdit').html('<a tabindex="-1" href="#"><i class="fa fa-pencil-square-o fa-fw"></i> Edit</a>');
                $('.hidden-file-upload-menu-item').hide();
                break;
        }


        if(currentActiveTab == 'Files')
        {

//            $('#contextMenuFileRemoveEdit').before('<li class="divider"></li>');
            $('#contextMenuFileRemoveEdit').html('<a tabindex="-1" href="#"><i class="fa fa-download fa-fw"></i> Download</a>');
//            $('#contextMenuFileRemoveEdit').after('<li class="divider"></li>');

        }

        $rowClicked = $(this);
        $contextMenu.css({
            display: "block",
            left: e.pageX,
            top: e.pageY
        });
        return false;
    });

    $contextMenu.on("click", "a", function () {

        var selectedRowProject = $rowClicked.children("*")[1].innerHTML;
//        var selectedRowTask
//        socket.emit('Request_Three_Objects',selectedRowProject );
//        socket.on("Three_Objects_Receive",function(task,user)
//        {
//            gl_user_projectInfo= user;
//            gl_task_projectInfo= task;
//
//        });

        var selectedContextMenuItem = $(this).text();
        var currentActiveTab = $('#get-active-tab .active').text();

        $contextMenu.hide();

        switch(selectedContextMenuItem)
        {
            case ' New':

                switch(currentActiveTab)
                {
                    case 'Projects':
                        createNewProject();
                        break;
                    case 'Tasks':
                        createNewTask();
                        break;
                    case 'Files':
                        createNewFile();
                        break;
                    case 'Users':
                        createNewUser();
                        break;
                }

                break;

            case ' Info':


                switch(currentActiveTab)
                {
                    case 'Projects':

                       /* socket.emit('Request_Three_Objects',selectedRowProject );
                        socket.on("Three_Objects_Receive",function(task,user)
                        {
                            gl_user_projectInfo= user;
                            gl_task_projectInfo= task;
*/
                            $('#info-project-active-tab-in-project').tab('show');
                            getProjectInfo();
                            setProjectFields(selectedRowProject);
//                        });
//*/
                        break;
                    case 'Tasks':
                        $('#info-task-active-tab-in-task').tab('show');
                        getTaskInfo();
                        break;
                    case 'Files':
                        $('#info-file-active-tab-in-file').tab('show');
                        getFileInfo();
                        break;
                    case 'Users':
                        $('#info-user-active-tab-in-user').tab('show');
                        getUserInfo();
                        break;
                }

                break;

            case ' Edit':
                switch(currentActiveTab)
                {
                    case 'Projects':
                        editProject();
                        break;
                    case 'Tasks':
                        editTask();
                        break;
                    case 'Files':
//                        editFile();
                        break;
                    case 'Users':
                        editUser();
                        break;
                }

                break;


            case ' Delete':

//                selectedRowProject

                switch(currentActiveTab)
                {
                    case 'Projects':
                        deleteProjectConfirmationModal(selectedRowProject);
                        break;
                    case 'Tasks':

                        deleteTaskConfirmationModal(selectedRowProject);
                        break;
                    case 'Files':
                        deleteFileConfirmationModal(selectedRowProject);
                        break;
                    case 'Users':
                        deleteUserConfirmationModal(selectedRowProject);
                        break;
                }

                break;

            case ' Download':

                $('#contextMenuFileRemoveEdit a').prop("href", 'download');

                console.log (selectedRowProject);
               socket.emit("Download_file", selectedRowProject);

                socket.on("File_received", function()
                {
                    console.log("File_received called");


                });




                break;
        }

//        var message = "You clicked on the row '" +
//            $rowClicked.children("*")[1].innerHTML + "'\n"
//        message += "And selected the menu item '" + $(this).text() + "'"
//        alert(message);
    });

    $(document).click(function () {
        $contextMenu.hide();
    });


});

function getProjectInfo()
{
    var arrTask = [];

    for(var i in globalTotalTaskRecords)
    {
        arrTask.push(globalTotalTaskRecords[i].name);
    }
    var arrFile = [];

    for(var i in globalTotalFileRecords)
    {
        arrFile.push(globalTotalFileRecords[i].name);
    }
    var arrUser = [];

    for(var i in globalTotalUserRecords)
    {
        arrUser.push(globalTotalUserRecords[i].name);
    }

//    var arr = ['Task Item 1','Task Item 2','Task Item 3','Task Item 4','Task Item 5'];
//    var filesList = ['File Item 1','File Item 2','File Item 3','File Item 4','File Item 5'];
//    var usersList = ['User Item 1','User Item 2','User Item 3','User Item 4','User Item 5'];
//    tasksListInProjectInfo(tasksList);
    tasksListInProjectInfo(globalTotalTaskRecords);
    filesListInProjectInfo(arrFile);
//    usersListInProjectInfo(arrus);
    usersListInProjectInfo(globalTotalUserRecords);

    $('#info-project-modal-form').modal({
        show    : true,
        backdrop: false
    });
}

function setProjectFields(selectedRowName)
{
    for(var i in globalTotalProjectRecords)
    {
        if(globalTotalProjectRecords[i].name == selectedRowName)
        {
            $('#project-name-in-project-info').val(globalTotalProjectRecords[i].name);
            $('#project-status-in-project-info').val(globalTotalProjectRecords[i].status);
//            $('#project-target-date-in-project-info').val(globalTotalProjectRecords[i].targetDate);
            $('#project-start-date-in-project-info').val(globalTotalProjectRecords[i].startDate);
            $('#project-end-date-in-project-info').val(globalTotalProjectRecords[i].endDate);
        }
    }
}

function tasksListInProjectInfo(tasksList)
{
    var tasksListElement = $('#tasks-ul-in-project-info');
    tasksListElement.html('');
    var listItems = '';
    for(var i in tasksList)
    {
        listItems += '<li class="list-group-item">'+tasksList[i]+'</li>';
    }
    tasksListElement.html(listItems);
}
function filesListInProjectInfo(filesList)
{
    var filesListElement = $('#files-ul-in-project-info');
    filesListElement.html('');
    var listItems = '';
    for(var i in filesList)
    {
        listItems += '<li class="list-group-item">'+filesList[i]+'</li>';
    }
    filesListElement.html(listItems);
}
function usersListInProjectInfo(usersList)
{
    var usersListElement = $('#users-ul-in-project-info');
    usersListElement.html('');
    var listItems = '';
    for(var i in usersList)
    {
        listItems += '<li class="list-group-item">'+usersList[i]+'</li>';
    }
    usersListElement.html(listItems);
}





//function getProjectInfo(selectedRowProj)
//{
//    $('#info-project-modal-form').modal({
//        show    : true,
//        backdrop: false
//    });
//}


function getTaskInfo()
{
    $('#info-task-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
function getFileInfo()
{
//    $('#info-file-modal-form').modal({
    $('#info-file-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
function getUserInfo()
{
    $('#info-user-modal-form').modal({
        show    : true,
        backdrop: false
    });
}

function createNewProject()
{
    $('#projectName').val('');
    $('#projectDepartment').val('IT');
    $('#projectStartDate').val('');
    $('#projectEndDate').val('');
    $('#projectDescription').val('');

    $('#projectCreateButton').text('Create');
    $('#new-project-modal-form-heading').text('Create New Project');

    $('.project-status-visibility-control').hide();

    $('#new-project-modal-form').modal({
        show    : true,
        backdrop: false
    });
}

function createNewTask()
{
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

    $('#taskName').val('');
    $('#taskDepartment').val('IT');
//    $('#taskProject').val('');
    $('#taskStartDate').val('');
    $('#taskEndDate').val('');
    $('#taskDescription').val('');

    $('#taskCreateButton').text('Create');
    $('#new-task-modal-form-heading').text('Create New Project');

    $('#new-task-modal-form').modal({
        show    : true,
        backdrop: false
    });
}

function createNewFile()
{
    $('#fileName').val('');
    $('#fileDepartment').val('IT');
    $('#fileStartDate').val('');
    $('#fileEndDate').val('');
    $('#fileDescription').val('');

    $('#fileCreateButton').text('Create');
    $('#new-file-modal-form-heading').text('Create New File');

    $('#new-file-modal-form').modal({
        show    : true,
        backdrop: false
    });
}

function createNewUser()
{
    $('#user-project').hide();

    $('#userName').val('');
    $('#userDepartment').val('IT');
    $('#userEmail').val('');

    $('#userCreateButton').text('Create');
    $('#new-user-modal-form-heading').text('Create New Project');

    $('#new-user-modal-form').modal({
        show    : true,
        backdrop: false
    });
}

function editProject()
{
    //        get values of selected project from database

//    document.getElementById("datePicker").valueAsDate = new Date();

    var projectDummyValues = {
        name: 'project name dummy',
        department: 'IT',
        status: 'status dummy',
        startDate: 'start date dummy',
        endDate: 'end date dummy',
        budget: '345f',
        description: 'description dummy'
    };

    var projNameField = $('#projectName');
    var projDepartmentField = $('#projectDepartment');
    var projStartDateField = $('#projectStartDate');
//    $('#projectStartDate').valueAsDate = new Date();
    document.getElementById("projectStartDate").valueAsDate = new Date();
    var projEndDateField = $('#projectEndDate');
    var projBudget = $('#projectBudget');
    var projDescriptionField = $('#projectDescription');

    projNameField.val(projectDummyValues.name);
    projDepartmentField.val(projectDummyValues.department);
//    projStartDateField.val(projectDummyValues.startDate);
    projEndDateField.val(projectDummyValues.endDate);
    projBudget.val(projectDummyValues.budget);
    projDescriptionField.val(projectDummyValues.description);

    $('#myform').prop('action', 'page1.php');
    $('#projectCreateButton').text('Save Changes');
//    $('.project-status-visibility-control').css('visibility','visible');
    $('.project-status-visibility-control').show();
    $('#project-create-form').prop('action', 'project_Edit');

    $('#new-project-modal-form-heading').text('Edit Project');

    $('#new-project-modal-form').modal({
        show    : true,
        backdrop: false
    });

}


function editTask()
{
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

//    $('#taskProject')
    //        get values of selected project from database
    var taskDummyValues = {
        name: 'task name dummy',
        department: 'IT',
        status: 'status dummy',
        startDate: 'start date dummy',
        endDate: 'end date dummy',
        description: 'description dummy'
    };

    var taskNameField = $('#taskName');
    var taskDepartmentField = $('#taskDepartment');
    var taskStartDateField = $('#taskStartDate');
    var taskEndDateField = $('#taskEndDate');
    var taskDescriptionField = $('#taskDescription');

    taskNameField.val(taskDummyValues.name);
    taskDepartmentField.val(taskDummyValues.department);
    taskStartDateField.val(taskDummyValues.startDate);
    taskEndDateField.val(taskDummyValues.endDate);
    taskDescriptionField.val(taskDummyValues.description);

    $('#taskCreateButton').text('Save Changes');
    $('#new-task-modal-form-heading').text('Edit Task');

    $('#new-task-modal-form').modal({
        show    : true,
        backdrop: false
    });

}

//function editFile()
//{
//    //        get values of selected project from database
//    var projectDummyValues = {
//        name: 'name dummy',
//        department: 'IT',
//        status: 'status dummy',
//        startDate: 'start date dummy',
//        endDate: 'end date dummy',
//        description: 'description dummy'
//    };
//
//    var projNameField = $('#projectName');
//    var projDepartmentField = $('#projectDepartment');
//    var projStartDateField = $('#projectStartDate');
//    var projEndDateField = $('#projectEndDate');
//    var projDescriptionField = $('#projectDescription');
//
//    projNameField.val(projectDummyValues.name);
//    projDepartmentField.val(projectDummyValues.department);
//    projStartDateField.val(projectDummyValues.startDate);
//    projEndDateField.val(projectDummyValues.endDate);
//    projDescriptionField.val(projectDummyValues.description);
//
//    $('#projectCreateButton').text('Save Changes');
//    $('#new-project-modal-form-heading').text('Edit File');
//
//    $('#new-project-modal-form').modal({
//        show    : true,
//        backdrop: false
//    });
//
//}

function editUser()
{
    $('#userProjects').multiselect({
//        numberDisplayed: 4,
        buttonWidth: '225px',
        enableFiltering: true,
        filterPlaceholder: 'Search',
        includeSelectAllOption: true,
        maxHeight: 400
    });

    //        get values of selected project from database
    var userDummyValues = {
        name: 'user name dummy',
        department: 'IT',
        email: 'description dummy',
        designation: 'description dummy'
    };

    var userNameField = $('#userName');
    var userDepartmentField = $('#userDepartment');
    var userEmailField = $('#userEmail');
    var userDesignationField = $('#userDesignation');

    userNameField.val(userDummyValues.name);
    userDepartmentField.val(userDummyValues.department);
    userEmailField.val(userDummyValues.department);
    userDesignationField.val(userDummyValues.description);

    $('#userCreateButton').text('Save Changes');
    $('#new-user-modal-form-heading').text('Edit User');

//    $('#user-project').css('visibility','visible');
    $('#user-project').show();


    $('#new-user-modal-form').modal({
        show    : true,
        backdrop: false
    });

}

function deleteProjectConfirmationModal(selectedRowProject)
{
    $('#get-hidden-row-data-in-project').val(selectedRowProject);
    $('#delete-project-confirmation-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
function deleteTaskConfirmationModal(selectedRowProject)
{
    $('#get-hidden-row-data-in-task').val(selectedRowProject);
    $('#delete-task-confirmation-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
function deleteFileConfirmationModal(selectedRowProject)
{
    $('#get-hidden-row-data-in-file').val(selectedRowProject);
    $('#delete-file-confirmation-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
function deleteUserConfirmationModal(selectedRowProject)
{
    $('#get-hidden-row-data-in-user').val(selectedRowProject);
    $('#delete-user-confirmation-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
