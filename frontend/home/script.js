requestUrl = 'http://localhost:3000/api/usuario';

fetch(requestUrl, method)
    .then((response) => {
        if (!response.ok) throw new Error('Algo deu errado: ' + response.status);
        return response.json();
    }).then((data) => {
        console.log(data);
        data = (id_search) ? data.data : data.usuario;
        const reviews = data.avaliacoes;
        if (reviews == undefined) return;

        const reviewsContainer = document.querySelector('aside.left .container');
        console.log(reviews);

        for (let i = 0; i < reviews.length; i++) {
            let nomeAvaliador = reviews[i].avaliado_por.nome;
            let idAvaliador = reviews[i].avaliado_por.documentId;
            let nota = reviews[i].nota;
            let descricao = reviews[i].descricao;


            //Cria um elemento HTML para cada review e adiciona no container de reviews.
            //Coloco o ID do usuário que fez a avaliação em um span com display none, para pegar o ID do usuário que fez a avaliação
            //quando clicar no nome do usuário.
            const reviewElement = document.createElement('article');
            reviewElement.classList.add('avaliacao-usuario');
            reviewElement.innerHTML = `
                    <a href="/ponto_turistico/ponto_turistico.html" class="local">
                        <div>
                            <img src="../src/img/galinha_choca.jpg" alt="galinha choca">
                        </div>
                        <span><b>Pedra da Galinha Choca</b></span>
                    </a>
                    `;
            reviewsContainer.appendChild(reviewElement);


            //Por ser uma função assíncrona, é necessário chamar a função de inicialização das estrelas dentro do fetch, para que
            //atualize a cada review adicionada. Adiciona as estrelas e calcula a média das notas fora do loop.
            stars_init(document.getElementsByClassName('stars'), document.getElementsByClassName('valor'));
            const nomeElements = document.getElementsByClassName('nome');

            //Adiciona um evento de clique em cada nome de usuário, para redirecionar para o perfil do usuário que fez a avaliação.
            //O Id é passado como parâmetro na URL.
            for (let j = 0; j < nomeElements.length; j++) {
                nomeElements[j].addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = `profile.html?id=${document.getElementsByClassName('documentId')[0].textContent}`;
                });
            }
        }
        //Calcula a média das notas e recalcula as estrelas para exibir corretamente.
        calc_nota();
        stars_init(document.getElementsByClassName('stars'), document.getElementsByClassName('valor'));
    })
    .catch(error => console.error('Erro ao carregar as reviews:', error));
s