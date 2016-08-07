/**
 * Created by faizankhan on 11/30/13.
 */

$(document).ready(function() {

    var socket = io.connect("http://localhost:1339");

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


        console.log(selectedRowProject);

        socket.emit('Request_Three_Objects',selectedRowProject );

        socket.on("Three_Objects_Receive",function(a,b,c)
        {
            console.log(a+"   "+b+"  "+c);

        });

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
                        $('#info-project-active-tab-in-project').tab('show');
                        getProjectInfo(selectedRowProject);
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
                        deleteTaskConfirmationModal();
                        break;
                    case 'Files':
                        deleteFileConfirmationModal();
                        break;
                    case 'Users':
                        deleteUserConfirmationModal();
                        break;
                }

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






function getProjectInfo(selectedRowProj)
{
    $('#info-project-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
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

    $('#new-project-modal-form').modal({
        show    : true,
        backdrop: false
    });
}

function createNewTask()
{
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
    $('#new-file-modal-form-heading').text('Create New Project');

    $('#new-file-modal-form').modal({
        show    : true,
        backdrop: false
    });
}

function createNewUser()
{
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
        description: 'description dummy'
    };

    var projNameField = $('#projectName');
    var projDepartmentField = $('#projectDepartment');
    var projStartDateField = $('#projectStartDate');
    var projEndDateField = $('#projectEndDate');
    var projDescriptionField = $('#projectDescription');

    projNameField.val(projectDummyValues.name);
    projDepartmentField.val(projectDummyValues.department);
    projStartDateField.val(projectDummyValues.startDate);
    projEndDateField.val(projectDummyValues.endDate);
    projDescriptionField.val(projectDummyValues.description);

    $('#project-create-form').prop('action', 'project_Edit');

    $('#projectCreateButton').text('Save Changes');
    $('#new-project-modal-form-heading').text('Edit Project');

    $('#new-project-modal-form').modal({
        show    : true,
        backdrop: false
    });

}

function editTask()
{
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

    $('#new-user-modal-form').modal({
        show    : true,
        backdrop: false
    });

}

function deleteProjectConfirmationModal(selectedRowProject)
{

    $('#get-hidden-row-data').val(selectedRowProject);
    $('#delete-project-confirmation-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
function deleteTaskConfirmationModal()
{
    $('#delete-task-confirmation-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
function deleteFileConfirmationModal()
{
    $('#delete-file-confirmation-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
function deleteUserConfirmationModal()
{
    $('#delete-user-confirmation-modal-form').modal({
        show    : true,
        backdrop: false
    });
}
