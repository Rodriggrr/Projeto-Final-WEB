class Popup {
    constructor() {
        this.ready = false;
        this.readyPromise = new Promise((resolve, reject) => {
            (async () => {
                try {
                    const response = await fetch("../src/popup/popup.html");
                    const data = await response.text();
                    document.getElementById("popup-container").innerHTML = data;
                    document.getElementById("popup-exit-button").addEventListener('click', () => {
                        document.getElementById("popup-container").style.display = 'none';
                    });
                    this.popupContainer = document.getElementById("popup-container");
                    this.avaliarButton = document.getElementById("avaliar-button");
                    document.getElementById("popup-exit-button").addEventListener('click', () => {
                        this.popupContainer.style.display = 'none';
                    });
                    this.ready = true;
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })();
        });
    }

    isReady() {
        return this.ready;
    }

    whenReady() {
        return this.readyPromise;
    }

    showPopup() {
        this.popupContainer.style.display = 'flex';
    }

    hidePopup() {
        this.popupContainer.style.display = 'none';
    }

    getNota() {
        return document.getElementById("avaliar-number").value;
    }

    getComentario() {
        return document.getElementById("avaliar-textarea").value;
    }

    getAvaliarButton() {
        return this.avaliarButton;
    }

    setName(name) {
        document.getElementById("popup-person-name").innerHTML = name;
    }
}

/**
 * Function to handle the evaluation button functionality.
 * It fetches user reviews, updates the UI accordingly, and handles the creation or update of reviews.
 *
 * @param {boolean} [user=true] - Indicates if the evaluation is for a user or an attraction.
 * @param {HTMLElement} [button=''] - The button element that triggers the evaluation popup.
 */
function avaliarButton(user = true, button = '') {
    let API_URL = 'http://localhost:1337/api';
    let update = false;

    let avaliando_a = new URLSearchParams(window.location.search).get('id');
    let avaliado_por = sessionStorage.getItem('publicUserId');
    let id_avaliacao = '';
    popup = new Popup();
    popup.whenReady().then(() => {

        fetch(`${API_URL}/avaliacaos?filters[avaliado_por][documentId][$eq]=${avaliado_por}&filters[${user ? "avaliando_usuario" : "avaliando_atracao"}][documentId][$eq]=${avaliando_a}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
            }
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
        
            // Verifica se a resposta tem conteúdo antes de tentar parsear JSON
            const text = await response.text();
            if (!text) return null;  // Retorna null se a resposta estiver vazia
        
            return JSON.parse(text); // Converte JSON manualmente
        }).then(data => {
            console.log(data);
            if(data.data.length > 0) {
                button.innerHTML = 'Atualizar avaliação';
                let avaliado = data.data[0];
                update = true;
                id_avaliacao = avaliado.documentId;
                document.getElementById('avaliar-number').value = avaliado.nota;
                document.getElementById('avaliar-textarea').value = avaliado.descricao;
                document.getElementById('avaliar-button').innerHTML = 'Atualizar';
                let deletarButton = document.getElementById('deletar-button');
                deletarButton.style.display = 'inline';
                deletarButton.addEventListener('click', () => {
                    if (!confirm('Deseja realmente deletar essa avaliação?')) return;
                    fetch(`${API_URL}/avaliacaos/${id_avaliacao}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
                        }
                    }).then(response => {
                        if (!response.ok) throw new Error('Erro ao deletar avaliação.');
                        return response.text();
                    }).then(text => {
                        if (text) {
                            const data = JSON.parse(text);
                            console.log(data);
                        }
                        window.location.reload();
                    }).catch(error => {
                        console.error(error);
                    });
                });
            }
        });


        let avaliarButton = document.getElementById('avaliar-button');
        if (!id_search) button.style.display = 'none';

        button.addEventListener('click', () => {
            document.getElementById('popup-container').style.display = 'flex';
        });

        avaliarButton.addEventListener('click', () => {
            document.getElementById('popup-container').style.display = 'none';
            fetch(`${API_URL}/avaliacaos${(update) ? `/${id_avaliacao}` : ''}`, {
                method: `${update ? 'PUT' : 'POST'}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify({
                    data: {
                        [user ? 'avaliando_usuario' : 'avaliando_atracao']: avaliando_a,
                        nota: popup.getNota(),
                        descricao: popup.getComentario(),
                        avaliado_por: avaliado_por
                    }
                })
            }).then(response => {
                if (!response.ok) throw new Error('Erro ao avaliar.');
                return response.json();
            }).then(data => {
                console.log(data);
                window.location.reload();
            })
        });
    });

}