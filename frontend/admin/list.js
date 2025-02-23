let params = new URLSearchParams(window.location.search);
let type = params.get('type');
if(!type) { type = 'dashboard'; window.location.href = `./index.html`; }

if(!estaLogado()) window.location.href = './login.html';
checkAdminRole();
setTimeout(() => {
    document.body.style.display = 'block';
}, 500);



URL = `http://localhost:1337/api/${type}`;

async function getItems(type) {
    const res = await fetch(`${URL}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
        }
    });
    return await res.json();
}

async function deleteItem(type, id) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
        }
    });
}

async function updateItem(type, id, data) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function createItem(type, data) {
    const res = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

function populateMain(main) {
    getItems(type)
        .then(async (data) => {
            const items = type == 'users' ? data : data.data;
            console.log('Items:', items);

            let table = document.querySelector('table');
            let tbody = table.querySelector('tbody');
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let row = document.createElement('tr');

                let nome = item.nome ? item.nome : item.username;
                row.innerHTML = `
                <td class=id>${item.id}</td>
                <td class=docId>${item.documentId}</td>
                <td>${nome}</td>
                <td class=nota>${await getMediaNota(item.documentId, type)}</td>
                <td class="actions">
                    <button class="edit">Editar</button>
                    <button class="delete">Excluir</button>
                </td>
                `;
                tbody.appendChild(row);
            }
        }).then(() => {
            let rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                let id = type=='users' ? row.querySelector('.id').innerText : row.querySelector('.docId').innerText;
                let editButton = row.querySelector('.edit');
                let deleteButton = row.querySelector('.delete');
                editButton.addEventListener('click', () => {
                    window.location.href = `./edit.html?type=${type}&id=${id}`;
                });
                deleteButton.addEventListener('click', () => {
                    deleteItem(type, id).then(data => {
                        console.log('Item deletado:', data);
                        window.location.reload();
                    });
                });
            });
        }).catch(error => {
            console.error('Erro:', error);
            main.innerHTML = "Erro ao carregar os itens.";
        });

    }



let main = document.getElementsByTagName('main')[0];
populateMain(main);