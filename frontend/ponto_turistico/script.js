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
            console.log('Atração encontrada:', atracao);

            if (atracao) {
                detalhesElemento.innerHTML = atracao || "Descrição não disponível.";
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

//verifica se o usuário está logado, se estiver, pega o nome e a foto do usuário.
//se não estiver, esconde o campo de avaliação.
if(estaLogado()){
    getNome(id);
    getDescr(id); 
}
else {
    document.getElementById('avaliacoes').innerHTML += '<h3>Para avaliar é necessário estar logado</h3>';
    document.getElementById('comentario').style.display = 'none';
    document.getElementById('comentar').style.display = 'none';
}

document.getElementById('formComentario').addEventListener('submit', (e) => {
    e.preventDefault();
    let comentario = document.getElementById('comentario').value;
});

/*
let formComentario = document.getElementById('formComentario');

async function comment(comentario, nome, foto, token) {

    let dadosAvaliacao = {
        comentario: comentario,
        nome: nome,
        foto: foto
    }

    let response = fetch('http://localhost:1337/api/avaliacaos', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(dadosAvaliacao)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        document.getElementById('comentario').value = '';
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar a avaliação.');
    });
}

*/
