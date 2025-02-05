const params = new URLSearchParams(window.location.search);
id = params.get('id');
id_search = true;

if(id == null) {
    id_search = false;
    id = '';
}
console.log(`id: ${id}. ID Search: ${id_search}`);

const API_URL = "http://localhost:1337/api";

function calc_nota() {
    let valores = document.getElementsByClassName('valor');
    let valor_ignore = document.getElementsByClassName('ignore');

    let sum = parseFloat(valor_ignore[0].textContent) * -1;

    for (let i = 0; i < valores.length; i++) {
        console.log(sum);
        sum += parseFloat(valores[i].textContent);
    }

    let modificar_value = document.getElementsByClassName('media');

    let media = sum / (valores.length - 1);

    for (let i = 0; i < modificar_value.length; i++) {
        modificar_value[i].textContent = `${media.toFixed(2)}`;
        console.log(modificar_value[i].innerText);

    }
}

function getUserProfile(id = '') {

    function getParceria(data) {
        if (data.eh_guia) return "Guia";
        if (data.eh_motorista) return "Motorista";
        return "Turista";
    }

    let requestUrl = `${API_URL}/users/me?populate[usuario][populate][0]=foto`;
    const method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
        }
    };



    if(id_search) {
        method.method = 'GET';
        method.headers = { 'Content-Type': 'application/json' };
        requestUrl = `${API_URL}/usuarios/${id}?populate[0]=avaliacoes`
    }

    fetch(requestUrl, method)
        .then((response) => {
            if (!response.ok) throw new Error('Algo deu errado');
            return response.json();
        })
        .then((data) => {
            console.log(data);
            data = (id_search) ? data.data : data.usuario;
            const { nome, nota, sexo, nascimento, bio, foto } = data;
            const nascimentoFormatado = nascimento.split('-').reverse().join('/');
            const parceria = getParceria(data);
            const fotoUrl = foto ? `http://localhost:1337${foto.url}` : '../src/img/profile_placeholder.png';

            console.log(`Nome: ${nome}, Nota: ${nota}, Parceria: ${parceria}, Sexo: ${sexo}, Nascimento: ${nascimentoFormatado}`);

            document.getElementById('pp').src = fotoUrl;
            document.querySelector('.nome .value').innerHTML = nome;
            document.getElementById('apelido').innerHTML = nome.toUpperCase();
            document.getElementById('nota').innerHTML = nota;
            document.querySelector('.sexo .value').innerHTML = sexo;
            document.querySelector('.nascimento .value').innerHTML = nascimentoFormatado;
            document.querySelector('.textplace').innerHTML = bio;
            document.querySelector('.parceria .value').innerHTML = parceria;
            stars_init(document.getElementsByClassName('stars'), document.getElementsByClassName('valor'));
        })
        .catch(error => console.log("Erro: " + error));
}

function getUserReviews() {
    let requestUrl = `${API_URL}/users/me?populate[usuario][populate][avaliacoes][populate][0]=avaliado_por`;
    let method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
        }
    };

    if(id_search) {
        method.method = 'GET';
        method.headers = { 'Content-Type': 'application/json' };
        requestUrl = `${API_URL}/usuarios/${id}?populate=*`
    }

    fetch(requestUrl, method)
      .then((response) => {
        if (!response.ok) throw new Error('Algo deu errado: ' + response.status);
        return response.json();
    }).then((data) => {
        console.log(data);
        data = (id_search) ? data.data : data.usuario;
        const reviews = data.avaliacoes;
        if(reviews == undefined) return;

        const reviewsContainer = document.querySelector('aside.left .container');
        console.log(reviews);

        for (let i = 0; i < reviews.length; i++) {
            let nomeAvaliador = reviews[i].avaliado_por.nome;
            let idAvaliador = reviews[i].avaliado_por.documentId;
            let nota = reviews[i].nota;
            let descricao = reviews[i].descricao;

                    const reviewElement = document.createElement('article');
                    reviewElement.classList.add('avaliacao-usuario');
                    reviewElement.innerHTML = `
                        <div class="nome-nota">
                            <a href="" class="nome">${nomeAvaliador}</a>
                            <span style="display: none" class="documentId">${idAvaliador}</span>
                            <div class="avaliacao">
                                <div class="stars"></div>
                                <span class="valor" style="display: none">${nota}</span>
                            </div>
                        </div>
                        <div class="border"></div>
                        <div class="content">${descricao}</div>
                    `;
                    reviewsContainer.appendChild(reviewElement);
                    stars_init(document.getElementsByClassName('stars'), document.getElementsByClassName('valor'));
                    calc_nota();
                    const nomeElements = document.getElementsByClassName('nome');
                    for (let j = 0; j < nomeElements.length; j++) {
                        nomeElements[j].addEventListener('click', (e) => {
                            e.preventDefault();
                            window.location.href = `profile.html?id=${e.target.nextElementSibling.textContent}`;
                        });
                    }
                }
            })
            .catch(error => console.error('Erro ao carregar as reviews:', error));
}

getUserProfile(id);
getUserReviews();
calc_nota();



document.getElementById('desconectar').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja encerrar a sessão?')) {
        sessionStorage.removeItem('jwtToken');
        window.location.href = '../home';
    }
});
