import { baseURL } from "../../scripts/baseURL.js"






export async function acessarDepartamento(departamento, token) {
    console.log(departamento)
    let modalView = document.getElementsByClassName("modal-bg-view")[0]
    modalView.classList.remove("hidden")

    let depName = document.getElementById("view-dep-name")
    depName.innerText = departamento.name
    
    let depDescription = document.getElementById("view-dep-description")
    depDescription.innerText = departamento.description

    let companyName = document.getElementById("view-company")
    companyName.innerText = departamento.companies.name

    await fetch(`${baseURL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => response.json())
    .then(response => console.log(response))
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
    console.log(usuario)
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
