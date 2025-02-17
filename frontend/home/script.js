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
            let imgURL;
            if (atracao[i].foto === null){
                imgURL = "../src/img/logo-placeholder-image.png";
            }
            else{
                imgURL = "http://localhost:1337"+atracao[i].foto[0].url;
            }
            let nome = atracao[i].nome;
           
            const atracaoElement = document.createElement('div');
            atracaoElement.innerHTML = `
                    <a href="../ponto_turistico/ponto_turistico.html?id=${atracao[i].documentId}" class="atracao-container">
                        <div>
                            <img src="${imgURL}" alt="${nome}">
                        </div>
                        <span><b>${nome}</b></span>
                    </a>
                    `;
            document.getElementById('content').appendChild(atracaoElement);
        }
        
        document.getElementById('content').style.gridTemplateColumns = `repeat(${atracao.length > 3 ? 3 : atracao.length}, 1fr)`;

    })
    .catch(error => console.error('Erro ao carregar as atracoes:', error));

