
document.addEventListener("DOMContentLoaded", function () {

    document.querySelector('a[href="#users"]').addEventListener('click', function (e) {
        e.preventDefault(); 
        carregarUsuarios(); 
    });
});

async function carregarUsuarios() {
    try {
        const response = await fetch('http://localhost:1337/api/usuarios');

        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.status}`);
        }

        const data = await response.json();
        exibirUsuarios(data.data); 
    } catch (error) {
        console.error("Erro:", error);
        alert("Falha ao carregar usuários. Tente novamente mais tarde.");
    }
}

function exibirUsuarios(usuarios) {
    const usersSection = document.getElementById("users");

    usersSection.innerHTML = `
        <h2>Users</h2>
        <p>Manage your users here.</p>
        <table id="users-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Type</th>
                    <th>Gender</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- As linhas serão inseridas aqui dinamicamente -->
            </tbody>
        </table>
    `;

    const usersTable = document.getElementById("users-table").getElementsByTagName('tbody')[0];

    for (const usuario of usuarios) {
        console.log("Usuário retornado pela API:", usuario);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${usuario.documentId}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.contato}</td>
            <td>${usuario.parceria}</td>
            <td>${usuario.sexo}</td>
            <td>
                <a href="editar-usuario.html?documentId=${usuario.documentId}">Editar</a>
            </td>
        `;
        usersTable.appendChild(tr);
    }
}