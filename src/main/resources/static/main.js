const URL = "http://localhost:8080/test/api/";

async function getActiveUser() {
    return await fetch(URL + "activeUser").then(response => response.json());
}

async function createHeader() {
    let activeUser = await getActiveUser();
    let roles = "";
    if (activeUser.roles.length > 1) {
        roles = "ADMIN, USER";
    } else {
        roles = "USER";
    }
    let header = document.createElement("header");
    header.innerHTML = `
            <div>
                <div class="header">
                    <div class="container-fluid">
                        <div class="row bg-dark">
                            <div class="col-11">
                                <div class="text-white mt-3">
                                    <strong id="activeUser">${activeUser.username}</strong>
                                     with roles: ${roles}
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="btn">
                                    <a class="btn btn-outline-light btn-lg" onclick="logout()" href="/logout/" role="button">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    document.body.appendChild(header);
}

function logout() {
    document.querySelector("#mainPanel").remove();
}

function switchToUser() {
    document.body.querySelector("#adminPanel").hidden = true;
    document.body.querySelector("#userPanel").hidden = false;
    document.body.querySelector("#adminTab").setAttribute("class", "nav-link");
    document.body.querySelector("#adminTab").setAttribute("aria-selected", "false");
    document.body.querySelector("#userTab").setAttribute("class", "nav-link active");
    document.body.querySelector("#userTab").setAttribute("aria-selected", "true");

}

function switchToAdmin() {
    document.querySelector("#adminPanel").hidden = false;
    document.querySelector("#userPanel").hidden = true;
    document.body.querySelector("#userTab").setAttribute("class", "nav-link");
    document.body.querySelector("#userTab").setAttribute("aria-selected", "false");
    document.body.querySelector("#adminTab").setAttribute("class", "nav-link active");
    document.body.querySelector("#adminTab").setAttribute("aria-selected", "true");
}

async function createSidebar() {
    let activeUser = await getActiveUser();
    let sidebar = document.createElement("div");
    let navbar = document.createElement("div");
    sidebar.innerHTML = `<div class="row" id="mainRow">
        <div class="col-2"></div>
            <div id="rolesNavbar" class="col-2 sidebar container-fluid bg-white text-center"  style="height:100vh;position: fixed;left: 0"></div>
        </div>`
    document.body.appendChild(sidebar);
    if (activeUser.roles.length > 1) {
        navbar.innerHTML = `
                <button id="adminTab" class="nav-link active" role="tab"
                           onclick="switchToAdmin()" aria-controls="v-pills-home" aria-selected="true">Admin</button>

                <button id="userTab" class="nav-link" role="tab"
                           onclick="switchToUser()" aria-controls="v-pills-profile" aria-selected="false">User</button>
                `
    } else {
        navbar.innerHTML = `
            <button class="nav-link active" role="tab"
                          onclick="switchToAdmin()" aria-controls="v-pills-profile" aria-selected="true">User</button>

            `
    }

    navbar.setAttribute("class", "nav flex-column nav-pills pt-4");
    navbar.setAttribute("role", "tablist");
    navbar.setAttribute("aria-orientation", "vertical");

    let sidebarToCreate = document.querySelector("#rolesNavbar");
    sidebarToCreate.appendChild(navbar);
}

function createEditButton(user) {
    let editButton = document.createElement("button");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("class", "btn btn-info text-white");
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("id", "editButtonId" + user.id);
    editButton.setAttribute("data-bs-target", "#editModal" + user.id)
    editButton.setAttribute("onclick", "createModal('Edit', " + user.id + ")")
    editButton.innerHTML = `Edit`;
    return editButton;
}

function createDeleteButton(user) {
    let editButton = document.createElement("button");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("class", "btn btn-danger");
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("id", "editButtonId" + user.id);
    editButton.setAttribute("data-bs-target", "#deleteModal" + user.id)
    editButton.setAttribute("onclick", "createModal('Delete', " + user.id + ")")
    editButton.innerHTML = `Delete`;
    return editButton;
}

async function createModal(typeOfModal = "Edit", userId = 2) {
    let modalWrap = null;
    if (modalWrap !== null) {
        modalWrap.remove();
    }
    const p = new Promise(function (resolve) {
        resolve(fetch(URL + userId)
            .then(response => response.json())
            .then(user => {
                modalWrap = document.createElement("div");
                modalWrap.setAttribute("id", "modalWindow")
                modalWrap.innerHTML = `
                                            <div class="modal fade" id="modal${user.id}" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                                              <div class="modal-dialog">
                                                <div class="modal-content">
                                                  <div class="modal-header">
                                                    <h5 class="modal-title" id="modalLabel">Edit</h5>
                                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                                      <span aria-hidden="true">&times;</span>
                                                    </button>
                                                  </div>
                                                  <div class="modal-body text-center" >
                                                    <form method="PUT" action="/admin/${user.id}">
                                                    <div class="form-group">
                                                         <strong><label for="id" >ID</label></strong>
                                                        <input type="number" class="form-control" value="${user.id}" id="id" disabled aria-describedby="nameHelp">
                                                      </div>
                                                      <div class="form-group">
                                                         <strong><label for="name">First name</label></strong>
                                                        <input type="text" class="form-control" value="${user.name}" id="name"  aria-describedby="nameHelp">
                                                      </div>
                                                      <div class="form-group">
                                                        <strong><label for="surname">Surname</label></strong>
                                                        <input type="text" class="form-control" value="${user.surname}" id="surname"  aria-describedby="surnameHelp">
                                                      </div>
                                                      <div class="form-group">
                                                         <strong><label for="age">Age</label></strong>
                                                        <input type="number" class="form-control" value="${user.age}" id="age"  aria-describedby="surnameHelp">
                                                      </div>
                                                      <div class="form-group">
                                                         <strong><label for="email">Email</label></strong>
                                                        <input type="email" class="form-control" value="${user.username}" id="email"  aria-describedby="emailHelp">
                                                      </div>

                                                    </form>
                                                  </div>
                                                  <div class="modal-footer">
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                        `
                let selectControl = document.createElement("div");
                switch (typeOfModal) {
                    case "Edit":
                        console.log("Edit modal");
                        modalWrap.querySelector("#modalLabel").innerHTML = "Edit";
                        modalWrap.querySelector("form").setAttribute("method", "PUT");
                        modalWrap.querySelector("form").setAttribute("action", "/test/api/" + user.id);
                        const passwordGroup = document.createElement("div");
                        passwordGroup.innerHTML = ` <strong><label for="password">Password</label></strong>
                                                  <input type="password" class="form-control" id="password" aria-describedby="passwordHelp">`;
                        passwordGroup.setAttribute("class", "form-group");
                        modalWrap.querySelector("form").appendChild(passwordGroup)
                        selectControl = document.createElement("div");
                        selectControl.innerHTML = `<strong><label for="role">Role</label></strong>
                                                      <select class="form-select" multiple aria-label="multiple select example" id="role">
                                                        <option selected>Admin</option>
                                                        <option value="1">User</option>
                                                      </select>
                                                      `
                        modalWrap.querySelector("form").appendChild(selectControl)

                        modalWrap.querySelector(".modal-footer").innerHTML =
                            `<button type="button" class="btn" onclick="deleteModal()" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                <button class="btn btn-primary" data-bs-dismiss="modal" onclick="editUser(${user.id})" type="submit">Edit User</button>`
                        break;

                    case "Delete":
                        console.log("Delete Modal");
                        modalWrap.querySelector("#modalLabel").innerHTML = "Delete";
                        modalWrap.querySelector("form").setAttribute("method", "DELETE");
                        modalWrap.querySelector("form").setAttribute("action", "/test/api/" + user.id);
                        modalWrap.querySelector("#name").disabled = true;
                        modalWrap.querySelector("#surname").disabled = true;
                        modalWrap.querySelector("#age").disabled = true;
                        modalWrap.querySelector("#email").disabled = true;
                        selectControl = document.createElement("div");
                        selectControl.innerHTML = `<strong><label for="role">Role</label></strong>
                                                      <select class="form-select" multiple aria-label="multiple select example" disabled id="role">
                                                        <option value="0">Admin</option>
                                                        <option value="1">User</option>
                                                      </select>
                                                      `
                        modalWrap.querySelector("form").appendChild(selectControl);

                        modalWrap.querySelector(".modal-footer").innerHTML =
                            `<button type="button" class="btn" onclick="deleteModal()" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                <button class="btn btn-danger" onclick="deleteUser(${user.id})" data-bs-dismiss="modal" type="submit">Delete User</button>`
                        break;

                }

                document.body.append(modalWrap);
                let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
                modal.show();
            }))

    })


}

async function deleteModal() {
    await document.querySelector("#modalWindow").remove();
}

async function deleteUser(id) {
    console.log("User with ID " + id + " is being deleted");
    await fetch(URL + id, {method: "DELETE"});
    await deleteModal();
    await reRenderPage();
}

async function editUser(id) {
    console.log("Editing user with ID " + id);
    const editModal = document.body.querySelector("#modal" + id)
    const name = editModal.querySelector("#name").value;
    const surname = editModal.querySelector("#surname").value;
    const age = editModal.querySelector("#age").value;
    const username = editModal.querySelector("#email").value;
    const password = editModal.querySelector("#password").value;
    let role = editModal.querySelector("#role").selectedIndex;
    if (role === 0) {

        role = [
            {
                "id": 1,
                "name": "ROLE_USER",
                "users": null,
                "authority": "ROLE_USER"
            },
            {
                "id": 2,
                "name": "ROLE_ADMIN",
                "users": null,
                "authority": "ROLE_ADMIN"
            }
        ]
    } else {
        role = [
            {
                "id": 1,
                "name": "ROLE_USER",
                "users": null,
                "authority": "ROLE_USER"
            }
        ]
    }
    const editedUser = {
        "id": id,
        "name": name,
        "surname": surname,
        "age": age,
        "roles": role,
        "username": username,
        "password": password,
        enabled: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
        accountNonLocked: true
    };
    await fetch(URL,
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedUser)
        });
    await deleteModal();
    await reRenderPage();
}

async function reRenderPage() {
    document.querySelector("#mainPanel").remove();
    await createMainPanel();

}

async function createTable(allUsers) {
    const table = document.createElement("tbody");
    for (let i = 0; i < allUsers.length; i++) {
        // creates a table row
        const row = document.createElement("tr");

        let cell = document.createElement("td");
        let cellText = document.createTextNode(allUsers[i].id);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(allUsers[i].name);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(allUsers[i].surname);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(allUsers[i].age);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(allUsers[i].username);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        let roles;
        if (allUsers[i].roles.length > 1) {
            roles = "ADMIN, USER";
        } else roles = "USER";
        cellText = document.createTextNode(roles);
        cell.appendChild(cellText);
        row.appendChild(cell);

        const editButtonCell = document.createElement("td");
        let editButton = createEditButton(allUsers[i]);
        editButtonCell.appendChild(editButton);
        row.appendChild(editButtonCell);

        const deleteButtonCell = document.createElement("td");
        let deleteButton = createDeleteButton(allUsers[i]);
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);
        table.appendChild(row);
    }
    return table;

}

async function createAdminPanel() {
    let allUsers = await fetch(URL).then(result => result.json());
    let adminPanel = document.createElement("div")
    adminPanel.setAttribute("class", "col-10")
    let tblBody = await createTable(allUsers)

    adminPanel.innerHTML = `
                        <div class="col-10" id="adminPanel">
                            <div class="h1 p-3">Admin panel</div>
                            <nav class="card col-11 px-2">
                                <div class="card-header">
                                    <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" onclick="reRenderPage()" aria-controls="home" aria-selected="true">Users Table</a>
                                        </li>
                                        <li>
                                            <a class="nav-link" id="profile-tab" data-bs-toggle="tab" href="#new" role="tab" aria-controls="profile" aria-selected="false">New User</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <h2 class="card-header">All Users</h2>
                                            <div class="container-fluid">
                                                <table id="usersTable" class="table table-striped">
                                                    <div class="p-30">
                                                        <hr>
                                                    </div>
                                                    <thead class="text-black">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">First name</th>
                                                            <th scope="col">Last name</th>
                                                            <th scope="col">Age</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Role</th>
                                                            <th scope="col">Edit</th>
                                                            <th scope="col">Delete</th>
                                                        </tr>
                                                    </thead>
                                                </table>

                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="new" role="tabpanel" aria-labelledby="profile-tab">
                                            <div  class="container-fluid">
                                                <div class="row text-center" >
                                                    <div class="col-2"></div>
                                                    <div class="col-8" id="newUserForm" >
                                                        <form class="text-center">
                                                            <div class="form-group col-6 mx-auto">
                                                                <strong><label for="nameNew" class="font-weight-bold">Name</label></strong>
                                                                <input type="text" class="form-control" id="nameNew"  aria-describedby="First Name" placeholder="Enter user's first name">
                                                            </div>

                                                            <div class="form-group col-6  mx-auto text-center">
                                                                <strong><label for="surnameNew" class="font-weight-bold">Last Name</label></strong>
                                                                <input type="text" class="form-control" id="surnameNew"  aria-describedby="Second Name" placeholder="Enter user's last name">
                                                                <div id="lastNameHelp" class="form-text"></div>

                                                            </div>
                                                            <div class="form-group col-6  mx-auto text-center">
                                                                <strong><label for="ageNew" class="font-weight-bold">Age</label></strong>
                                                                <input type="number" class="form-control" id="ageNew" aria-describedby="Age" placeholder="Enter user's age">
                                                                <div id="ageHelp" class="form-text"></div>

                                                            </div>
                                                            <div class="form-group col-6  mx-auto text-center">
                                                                <strong><label for="usernameNew" class="font-weight-bold">Email</label></strong>
                                                                <input type="email" class="form-control" id="usernameNew"  aria-describedby="email" placeholder="Enter user's email">
                                                                <div id="email help" class="form-text"></div>

                                                            </div>
                                                            <div class="form-group col-6  mx-auto text-center">
                                                                <strong><label for="passwordNew" class="font-weight-bold">Password</label></strong>
                                                                <input type="password" class="form-control"  id="passwordNew" placeholder="Enter user's password">
                                                            </div>
                                                            <div class="form-group col-6  mx-auto text-center">
                                                                <strong><label for="roleNew" class="font-weight-bold">Role</label></strong>
                                                            <select class="form-select form-select-sm" aria-label="Small select" id="roleNew" name="role" size="2" >
                                                                <option selected value="ROLE_USER">User</option>
                                                                <option value="ROLE_ADMIN">Admin</option>
                                                            </select>
                                                            </div>
                                                            <div class="mx-auto pt-3">
                                                                <button type="submit" onclick="submitNewUserForm()" class="btn btn-success text-center">Add new user</button>
                                                            </div>
                                                    </form>
                                                    </div>
                                                    <div class="col-2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    `


    adminPanel.querySelector("#usersTable").appendChild(await tblBody);
    document.querySelector("#mainPanel").appendChild(await adminPanel);
    await createUserPanel();
    document.querySelector("#userPanel").hidden = true;
}

async function createUserPanel() {
    let activeUser = await getActiveUser();
    let userPage = document.createElement('div');
    let roles;
    if (activeUser.roles.length > 1) {
        roles = "ADMIN, USER";
    } else roles = "USER";
    userPage.innerHTML = `
                                <div class="h1 p-3">User information page</div>
                                <nav class="card col-11 px-2" >
                                    <div class="card-header">
                                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Users Table</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content" id="userTabContent">
                                            <!--userpage-->
                                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <h2 class="card-header">About user</h2>
                                                <div class="container-fluid">
                                                    <table class="table table-striped">
                                                        <div class="p-30">
                                                            <br>
                                                        </div>
                                                        <thead class="text-black">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">First name</th>
                                                            <th scope="col">Last name</th>
                                                            <th scope="col">Age</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Role</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr scope="row" >
                                                            <td scope="row" >${activeUser.id}</td>
                                                            <td  scope="row"  >${activeUser.name}</td>
                                                            <td scope="row" >${activeUser.surname}</td>
                                                            <td scope="row" >${activeUser.age}</td>
                                                            <td scope="row" >${activeUser.username}</td>
                                                            <td scope="row">${roles}</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>`

    userPage.setAttribute("class", "col-10");
    userPage.setAttribute("id", "userPanel");
    const additionalDiv = document.createElement("div");
    additionalDiv.appendChild(userPage);
    additionalDiv.setAttribute("class","col-10");
    document.body.querySelector("#mainPanel").appendChild(additionalDiv);

}

async function createMainPanel() {
    let mainPanel = document.createElement("div");
    mainPanel.setAttribute("id", "mainPanel");
    mainPanel.setAttribute("class", "col-10");
    document.querySelector("#mainRow").appendChild(mainPanel);
    let activeUser = await getActiveUser();


    if (activeUser.roles.length > 1) {
        console.log(activeUser);
        await createAdminPanel();
        document.querySelector("#userPage").hidden = true;
    } else {
        await createUserPanel();

    }
}


document.addEventListener("DOMContentLoaded", async function () {
    await createHeader();
    await createSidebar();
    await createMainPanel();

})

async function submitNewUserForm() {
    let newUserFirstName = document.body.querySelector("#nameNew").value;
    let newUserLastName = document.body.querySelector("#surnameNew").value;
    let newUserAge = document.body.querySelector("#ageNew").value;
    let newUserEmail = document.body.querySelector("#usernameNew").value;
    let newUserPassword = document.body.querySelector("#passwordNew").value;
    let newUserRoles = document.body.querySelector("#roleNew").selectedIndex;
    if (newUserRoles === 0) {
        newUserRoles = [
            {
                "id": 1,
                "name": "ROLE_USER",
                "users": null,
                "authority": "ROLE_USER"
            }
        ]
    } else {
        newUserRoles = [
            {
                "id": 1,
                "name": "ROLE_USER",
                "users": null,
                "authority": "ROLE_USER"
            },
            {
                "id": 2,
                "name": "ROLE_ADMIN",
                "users": null,
                "authority": "ROLE_ADMIN"
            }
        ]
    }
    console.log(newUserEmail);
    await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": newUserFirstName,
            "surname": newUserLastName,
            "age": newUserAge,
            "roles": newUserRoles,
            "username": newUserEmail,
            "password": newUserPassword,
            "enabled": true,
            "credentialsNonExpired": true,
            "accountNonExpired": true,
            "accountNonLocked": true

        })
    })
    document.body.querySelector("#nameNew").value = "";
    document.body.querySelector("#surnameNew").value = "";
    document.body.querySelector("#ageNew").value = "";
    document.body.querySelector("#usernameNew").value = "";
    document.body.querySelector("#passwordNew").value = "";
    await reRenderPage();

}