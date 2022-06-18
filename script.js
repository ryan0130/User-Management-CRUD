
let userList;

function loadTable() {
    $.get('https://www.mecallapi.com/api/users', (data) => {
        userList = (data);
    }).done(() => buildInfoList());
}

const buildInfoList = () => {
    $('#content').empty();
    userList.forEach(user => {
        $('#content').append(
            `<tr>
                <th scope="row">${user.id}</th>
                <td><img width="50px" src="${user.avatar}" class="avatar"></td>
                <td>${user.fname}</td>
                <td>${user.lname}</td>
                <td>${user.username}</td>
             </tr>`
        )
    });
};

$('#deleteForm').submit((event) => {
    event.preventDefault();
    const formData = {
        "id": $('#deleteId').val()
    }
    $.ajax({
        url: 'https://www.mecallapi.com/api/users/delete',
        type: 'DELETE',
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function() {
            $('#deleteForm').trigger('reset');
            loadTable();
        }
    });
});

$('#myForm').submit((event) =>{
    event.preventDefault();
    const formData = {
        "fname": $('#fname').val(),
        "lname": $('#lname').val(),
        "username": $('#userName').val(),
        "email": $('#userName').val(),
        "avatar": "https://www.mecallapi.com/users/cat.png"
    };
    $.ajax({
        url: 'https://www.mecallapi.com/api/users/create',
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function() {
            $('#myForm').trigger('reset');
            loadTable();
        }
    })
});


$('#updateForm').submit((event) =>{
    event.preventDefault();
    const formData = {
        "id": $('#updateId').val(),
        "fname": $('#updateFname').val(),
        "lname": $('#updateLname').val(),
        "username": $('#updateUserName').val(),
        "email": $('#updateUserName').val,
        "avatar": "https://www.mecallapi.com/users/cat.png"
    };
    $.ajax({
        url: `https://www.mecallapi.com/api/users/update`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function() {
            $('#updateForm').trigger('reset');
            loadTable();
        }
    }).done(() => loadTable());
});
    
loadTable();



