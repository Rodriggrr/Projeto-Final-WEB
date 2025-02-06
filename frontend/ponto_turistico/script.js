function getDescr(id) {
    const URL = `http://localhost:1337/api/atracaos`;  
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const detalhesElemento = document.getElementById('detalhes');

            if (data && data.data && data.data.length > 0) {
                console.log('Resposta da API:', data);

                const atracao = data.data.find(item => item.id === id);
                console.log('Atração encontrada:', atracao);

                if (atracao) {
                    detalhesElemento.innerHTML = atracao.descricao || "Descrição não disponível.";
                } else {
                    detalhesElemento.innerHTML = "Atração não encontrada.";
                }
            } else {
                detalhesElemento.innerHTML = "Nenhuma atração encontrada.";
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('detalhes').innerHTML = "Erro ao carregar a descrição.";
        });
}

function getNome(id) {
    const URL = `http://localhost:1337/api/atracaos`;  
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const nomeElemento = document.getElementById('nome');

            if (data && data.data && data.data.length > 0) {
                console.log('Resposta da API:', data);

                const atracao = data.data.find(item => item.id === id);
                console.log('Atração encontrada:', atracao);

                if (atracao) {
                    nomeElemento.innerHTML = atracao.nome || "Nome não disponível.";
                } else {
                    nomeElemento.innerHTML = "Atração não encontrada.";
                }
            } else {
                nomeElemento.innerHTML = "Nenhuma atração encontrada.";
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('nome').innerHTML = "Erro ao carregar o nome.";
        });
}

getDescr(17); 
getNome(17);

//olhar o id do data no console


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

if(sessionStorage.getItem('jwtToken')){
    formComentario.addEventListener("submit", (e) =>{
        e.preventDefault();

        let comentario = document.getElementById('comentario').value;
        let nome = sessionStorage.getItem('nome');
        let foto = sessionStorage.getItem('foto');
        let token = sessionStorage.getItem('jwtToken'); 

        comment(comentario, nome, foto, token);
    });
}
else {
    document.getElementById('avaliacoes').innerHTML += '<h3>Para avaliar é necessário estar logado</h3>';
    document.getElementById('comentario').style.display = 'none';
    document.getElementById('comentar').style.display = 'none';
}

*/
