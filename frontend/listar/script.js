document.addEventListener("DOMContentLoaded", () => {
    listarUsuarios();
});

async function listarUsuarios() {
    try {
        const response = await fetch("http://localhost:1337/api/usuarios?populate[0]=foto");

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
        if(usuario.parceria != 1) return;
        const usuarioCard = document.createElement("section");
        usuarioCard.classList.add("usuarios");
        console.log("teste", usuario);
        let foto = '/frontend/src/img/user_example.png';
        if(usuario.foto){
            foto = "http://localhost:1337" + usuario.foto.url;
        }

        let nota = await getMediaNota(usuario.documentId);

        usuarioCard.innerHTML = `
          <div class="perfil">
                <img src="${foto}" alt="${usuario.nome}">
                <h3><a href="/perfil/${usuario.documentId}">${usuario.nome}</a></h3>
                <h4>${obterProfissao(usuario)}</h4>
                 <div class="stars"></div>
                        <span class="valor" style="display: none">${nota}</span>
                </div>
            </div>
        `;
        console.log(usuario.documentId)
        container.appendChild(usuarioCard);
        stars_init(document.getElementsByClassName('stars'), document.getElementsByClassName('valor'));
    });
    
}

function obterProfissao(data) {
    console.log(data)
    if(data.parceria == 0) return 'Turista';
    if(data.parceria == 1) return 'Guia';
    return 'Motorista';
}
