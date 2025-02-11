//--------------CHECAR BUSCA POR ID-----------------------
//Se for por ID, pega o ID da URL, ou seja, o id do perfil que deseja ver, então define que a pagina está em busca por ID usando a variável id_search.
const params = new URLSearchParams(window.location.search);
id = params.get('id');
id_search = true;

if (id == null) {
    id_search = false;
    id = '';
}
console.log(`id: ${id}. ID Search: ${id_search}`);
//--------------------------------------------------------

//função para pegar o perfil do ponto turístico de acordo com o ID passado.
function getDescr(id) {
    const URL = `http://localhost:1337/api/atracaos/${id}`;  
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const detalhesElemento = document.getElementById('detalhes');

            console.log('Resposta da API:', data);

            const atracao = data.data.descricao;
            const endereço = data.data.endereco;
            const horario = data.data.horario;
            console.log('Atração encontrada:', atracao);

            let informacoes = document.createElement('div');
            informacoes.innerHTML = `
                <p><i class="bi bi-geo-alt-fill"></i> Endereço: ${endereço}</p>
                <p><i class="bi bi-clock-fill"></i> Horário de Funcionamento: ${horario}</p>
            `;

            if (atracao) {
                detalhesElemento.innerHTML = atracao + informacoes.innerHTML|| "Descrição não disponível.";
            } else {
                detalhesElemento.innerHTML = "Atração não encontrada.";
            }
        
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('detalhes').innerHTML = "Erro ao carregar a descrição.";
        });
}

//função para pegar o nome do ponto turístico de acordo com o ID passado.
function getNome(id) {
    const URL = `http://localhost:1337/api/atracaos/${id}`;
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const nomeElemento = document.getElementById('nome');

            console.log('Resposta da API:', data);

            const atracao = data.data.nome;
            console.log('Nome da atração:', atracao);

            if (atracao) {
                nomeElemento.innerHTML = atracao || "Nome não disponível.";
            } else {
                nomeElemento.innerHTML = "Atração não encontrada.";
            }
        
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('nome').innerHTML = "Erro ao carregar o nome.";
        });
}

//função para pegar a avaliação do ponto turístico de acordo com o ID passado.
function getAvaliacao(id){
    const URL = `http://localhost:1337/api/atracaos/${id}?populate[avaliacaos][populate][avaliado_por][populate][0]=foto`;

    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            
            console.log('Resposta reviews:', data);

            let reviews = data.data.avaliacaos;
            
            
            for (let i=0; i < reviews.length; i++){
                let nota = reviews[i].nota;
                let foto = 'http://localhost:1337';
                if (reviews[i].avaliado_por.foto) {
                    foto += reviews[i].avaliado_por.foto.url;
                }
                let nome = reviews[i].avaliado_por.nome;
                let descricao = reviews[i].descricao;
                let reviewElement = document.createElement('div');
                reviewElement.innerHTML = `
                <div class="usuario">
                <img src="${foto} "class="avatar"></img>
                <h4>${nome}:</h4>
                <p>${descricao}</p>
                <div class="avaliacao">
                    <div class="stars"></div>
                    <span class="valor" style="display: none">${nota}</span>
                </div>
                </div>
                    `;
                document.getElementById('avaliacao_usuario').appendChild(reviewElement);
            }
            stars_init(document.getElementsByClassName('stars'), document.getElementsByClassName('valor'));
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('avaliacoes').innerHTML = "Erro ao carregar as avaliações.";
        });
}

//função para pegar a imagem do ponto turístico de acordo com o ID passado.
function getImg(id){
    const URL = `http://localhost:1337/api/atracaos/${id}?populate=*`;   
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const imgElemento = document.getElementById('imagem');

            console.log('Resposta da API:', data);

            const atracao = data.data;
            console.log('Imagem da atração:', atracao);

            if (atracao) {
                imgElemento.src = `http://localhost:1337${atracao.foto[0].url}` || "Imagem não disponível.";
            } else {
                imgElemento.src = "Imagem não disponível.";
            }
        
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('imagem').src = "Erro ao carregar a imagem.";
        });
}


//verifica se o usuário está logado, se estiver, pega o nome e a foto do usuário.
//se não estiver, esconde o campo de avaliação.
if(estaLogado()){
    getNome(id);
    getDescr(id); 
    getAvaliacao(id);
    getImg(id);
    avaliarButton(false, document.getElementById('avaliar'));
}
else {
    getImg(id);
    getNome(id);
    getDescr(id);
    getAvaliacao(id);
    document.getElementById('avaliacoes').innerHTML += '<h3>Para avaliar é necessário estar logado</h3>';
    document.getElementById('avaliar').style.display = 'none';
}

document.getElementById('formComentario').addEventListener('submit', (e) => {
    e.preventDefault();
    let comentario = document.getElementById('comentario').value;
});
