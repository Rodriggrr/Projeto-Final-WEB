document.addEventListener("DOMContentLoaded", () => {
    listarUsuarios();
});

async function listarUsuarios() {
    try {
        const response = await fetch("http://localhost:1337/api/usuarios");

        if (!response.ok) throw new Error(`Erro ao buscar usuários: ${response.status}`);

        const data = await response.json();
        exibirUsuarios(data.data);
    } catch (error) {
        console.error("Erro:", error);
    }
}

function exibirUsuarios(usuarios) {
    const container = document.querySelector(".container-usuarios");
    container.innerHTML = ""; 

    usuarios.forEach(async (usuario) => {

        const usuarioCard = document.createElement("section");
        usuarioCard.classList.add("usuarios");

        usuarioCard.innerHTML = `
          <div class="perfil">
                <img src="/frontend/src/img/user_example.png" alt="Usuário">
                <h4>${usuario.nome}</h4>
            </div>
            <div class="categoria">
                <h4>${obterProfissao(usuario)}</h4>
            </div>
            <div class="avaliacoes">
                <h4>Média de Avaliações: ${await getMediaNota(usuario.documentId) || "N/A"}</h4>
            </div>
        `;
        console.log(usuario.documentId)
        container.appendChild(usuarioCard);
    });
}

function obterProfissao(usuario) {
    if (usuario.eh_motorista) {
        return "Motorista"; 
    } else if (usuario.eh_turista) {
        return "Turista";
    } else if (usuario.eh_guia) {
        return "Guia";
    } else {
        return "Não definido";
    }
}