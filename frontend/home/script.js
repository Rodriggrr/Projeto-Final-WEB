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
            let imgURL =  atracao[i].foto[0].url;
            let nome = atracao[i].nome;
            
            const atracaoElement = document.createElement('div');
            atracaoElement.innerHTML = `
                    <div class="atracao-container">
                        <div>
                            <img src="http://localhost:1337${imgURL}" alt="${nome}">
                            <span class="documentId" style="display: none">${atracao[i].documentId}</span>
                        </div>
                        <span><b>${nome}</b></span>
                    </div>
                    `;
            document.getElementById('content').appendChild(atracaoElement);
        }

        let nomeElements = document.getElementsByClassName('atracao-container');
        for (let j = 0; j < nomeElements.length; j++) {
            nomeElements[j].addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `../ponto_turistico/ponto_turistico.html?id=${document.getElementsByClassName('documentId')[0].textContent}`;
            });
        }
    })
    .catch(error => console.error('Erro ao carregar as atracoes:', error));
s