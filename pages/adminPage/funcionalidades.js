import { baseURL } from "../../scripts/baseURL.js"
import { adminToken } from "./index.js"

async function criarDepartamento() {
    let selectCompany = document.getElementById("select-company")
    await fetch(`${baseURL}/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(response => {
            response.forEach(company => {
                let option = document.createElement("option")
                option.innerText = company.name
                selectCompany.append(option)
            })
        })

    let createBtn = document.getElementsByClassName("create")[0]
    createBtn.addEventListener('click', () => {
        let modalCreate = document.getElementsByClassName("modal-bg-create")[0]
        modalCreate.classList.remove("hidden")
    })

    let selectedCompany = ""
    selectCompany.addEventListener('change', () => {
        selectedCompany = selectCompany.value
    })
    let findedCompany = ""

    let finishCreate = document.getElementById("finish-create")
    finishCreate.addEventListener('click', async () => {
        await fetch(`${baseURL}/companies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(response => {
                findedCompany = response.find(company => {
                    return company.name == selectedCompany
                })
            })

        let departmentName = document.getElementById("dep-name")
        let departmentDescription = document.getElementById("dep-description")

        let newDepartment = {
            name: departmentName.value,
            description: departmentDescription.value,
            company_uuid: findedCompany.uuid,
        }

        await fetch(`${baseURL}/departments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify(newDepartment)
        })
            .then(response => response.json())
            .then(response => response)
        window.location.assign("./index.html")
    })
}
criarDepartamento()

export function editarDepartamento(departamento) {
    let modalEditDep = document.getElementsByClassName("modal-bg-edit-department")[0]
    modalEditDep.classList.remove("hidden")
    console.log(departamento)

    let editDescription = document.getElementById("edit-desc")
    editDescription.value = departamento.description

    let btnEditDep = document.getElementById("save-edit")
    btnEditDep.addEventListener('click', async () => {
        let newDescription = {
            description: editDescription.value
        }

        await fetch(`${baseURL}/departments/${departamento.uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify(newDescription),
        })
        .then(response => response.json())
        .then(response => response)
        window.location.assign("./index.html")
    })
}

export function deletarDepartamento(departamento) {
    let modalDeleteDep = document.getElementsByClassName("modal-bg-delete-department")[0]
    modalDeleteDep.classList.remove("hidden")

    let depName = document.getElementById("delete-dep-name")
    depName.innerText = departamento.name

    let confirmDeleteBtn = document.getElementById("confirm-delete")
    confirmDeleteBtn.addEventListener('click', async () => {
        await fetch(`${baseURL}/departments/${departamento.uuid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
        })
        window.location.assign("./index.html")
    })
}

export async function acessarDepartamento(departamento) {
    let modalView = document.getElementsByClassName("modal-bg-view")[0]
    modalView.classList.remove("hidden")

    let depName = document.getElementById("view-dep-name")
    depName.innerText = departamento.name

    let depDescription = document.getElementById("view-dep-description")
    depDescription.innerText = departamento.description

    let companyName = document.getElementById("view-company")
    companyName.innerText = departamento.companies.name

    await fetch(`${baseURL}/admin/out_of_work`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
        },
    })
        .then(response => response.json())
        .then(response => {
            contratarFuncionario(response, departamento)
            renderizarFuncionários(departamento)
        })
}

async function renderizarFuncionários(departamento) {
    let funcsList = document.getElementsByClassName("view-users-list")[0]
    funcsList.innerHTML = ""
    await fetch(`${baseURL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
        },
    })
        .then(response => response.json())
        .then(response => {
            let founded = response.filter(user => {
                return user.department_uuid == departamento.uuid
            })
            
            founded.forEach(elem => {
                let li = document.createElement("li")
                li.classList = "view-user flex flex-col"

                let userInfo = document.createElement("div")
                userInfo.classList = "view-user-info flex flex-col"

                let username = document.createElement("h3")
                username.innerText = elem.username

                let professionalLevel = document.createElement("p")
                professionalLevel.innerText = elem.professional_level[0].toUpperCase() + elem.professional_level.substring(1)


                let companyName = document.createElement("p")
                companyName.innerText = departamento.companies.name
                userInfo.append(username, professionalLevel, companyName)

                let removeUser = document.createElement("div")
                removeUser.classList = "remove-user flex justify-center"

                let btnRemove = document.createElement("button")
                btnRemove.innerText = "Desligar"
                removeUser.append(btnRemove)
                li.append(userInfo, removeUser)
                funcsList.append(li)

                btnRemove.addEventListener('click', () => {
                    demitirFuncionario(elem)
                })
            })
        })
}

function demitirFuncionario(funcionario) {
    let modalRemove = document.getElementsByClassName("modal-bg-delete")[0]
    modalRemove.classList.remove("hidden")

    let flexName = document.getElementById("flex-name")
    flexName.innerText = funcionario.username

    let btnRemove = document.getElementById("delete-user-confirm")
    btnRemove.addEventListener('click', async () => {
        await fetch(`${baseURL}/departments/dismiss/${funcionario.uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
        })
        .then(response => response.json())
        .then(response => response)
        window.location.assign("./index.html")
    })
}

function contratarFuncionario(users, departamento) {
    let outOfWorkList = document.getElementById("select-user")
    outOfWorkList.innerHTML = ""
    let optionDefault = document.createElement("option")
    optionDefault.disabled = true
    optionDefault.selected = true
    optionDefault.hidden = true
    optionDefault.innerText = "Selecionar usuário"
    outOfWorkList.append(optionDefault)

    let hireBtn = document.getElementById("hire")

    users.forEach(user => {
        let option = document.createElement("option")
        option.innerText = user.username
        outOfWorkList.append(option)

    })

    let selectedUser = ""
    outOfWorkList.addEventListener('change', () => {
        selectedUser = outOfWorkList.value
    })

    let newUserContract = {
        user_uuid: "",
        department_uuid: "",
    }

    hireBtn.addEventListener('click', async () => {
        let modalView = document.getElementsByClassName("modal-bg-view")[0]
        let findedUser = users.find(user => {
            return user.username == selectedUser
        })

        newUserContract.department_uuid = departamento.uuid
        newUserContract.user_uuid = findedUser.uuid

        await fetch(`${baseURL}/departments/hire`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify(newUserContract)
        })
            .then(response => response.json())
            .then(response => response)
            window.location.assign("./index.html")
    })
}

export function editarUsuario(usuario, token) {
    let newInfo = {
        "kind_of_work": "",
        "professional_level": "",
    }

    let workModality = document.getElementById("work-modality")
    workModality.addEventListener('change', () => {
        newInfo.kind_of_work = workModality.value
    })
    let professionalLevel = document.getElementById("profissional-level")
    professionalLevel.addEventListener('change', () => {
        newInfo.professional_level = professionalLevel.value
    })

    let btnEdit = document.getElementById("edit-user")
    btnEdit.addEventListener('click', async () => {
        await fetch(`${baseURL}/admin/update_user/${usuario.uuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newInfo)
        })
            .then(response => response.json())
            .then(response => console.log(response))

        window.location.assign("./index.html")
    })
}

export function deletarUsuario(usuario, token) {
    let flexName = document.getElementById("flex-name")
    flexName.innerText = usuario.username

    let deleteBtn = document.getElementById("delete-user-confirm")
    deleteBtn.addEventListener('click', async () => {
        try {
            await fetch(`${baseURL}/admin/delete_user/${usuario.uuid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(response => response)
        }
        catch {
            window.location.assign("./index.html")
        }
    })
}
