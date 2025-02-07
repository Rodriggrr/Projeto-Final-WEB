requestUrl = 'http://localhost:1337/api/atracaos?populate=*';
method = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

fetch(requestUrl, method)
    .then((response) => {
        if (!response.ok) throw new Error('Algo deu errado: ' + response.status);
        return response.json();
    }).then((data) => {
        console.log(data);
        atracao = data.data;
        
        for (let i = 0; i < atracao.length; i++) {
            let imgURL =  atracao[i].foto[i].url;
            let nome = atracao[i].nome;
            
            const atracaoElement = document.getElementById('content');
            atracaoElement.innerHTML += `
                    <a href="/ponto_turistico/ponto_turistico.html" class="local">
                        <div>
                            <img src="http://localhost:1337${imgURL}" alt="galinha choca">
                            <span class="documentId" style="display: none">${atracao[i].documentId}</span>
                        </div>
                        <span><b>${nome}</b></span>
                    </a>
                    `;
        }
        let nomeElements = document.getElementsByClassName('local');
        for (let j = 0; j < nomeElements.length; j++) {
            nomeElements[j].addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `../ponto_turistico/ponto_turistico.html?id=${document.getElementsByClassName('documentId')[0].textContent}`;
            });
        }
    })
    .catch(error => console.error('Erro ao carregar as atracoes:', error));
s