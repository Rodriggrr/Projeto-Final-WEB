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

function avaliarButton(user = true, button = '') {
    popup = new Popup();
    popup.whenReady().then(() => {
        let avaliarButton = document.getElementById('avaliar-button');
        if (!id_search) button.style.display = 'none';

        button.addEventListener('click', () => {
            document.getElementById('popup-container').style.display = 'flex';
        });
        avaliarButton.addEventListener('click', () => {
            document.getElementById('popup-container').style.display = 'none';
            fetch(`${API_URL}/avaliacaos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify({
                    data: {
                        [user ? 'avaliando_usuario' : 'avaliando_atracao']: id,
                        nota: popup.getNota(),
                        descricao: popup.getComentario(),
                        avaliado_por: sessionStorage.getItem('publicUserId')
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