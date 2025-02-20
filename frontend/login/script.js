let form = document.getElementById('form');

async function getPublicUserId(authToken) {
    try {
        let response = await fetch('http://localhost:1337/api/users/me?populate[0]=usuario', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (!response.ok) throw new Error('Erro ao buscar usuário.');
        let data = await response.json();
        return data.usuario.documentId;
    } catch (error) {
        console.log("Erro: " + error);
    }
}

let URL = 'http://localhost:1337/api';

async function login(email, senha) {
    fetch(`${URL}/auth/local`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier: email,
            password: senha
        })
    })
        .then((response) => {
            if (!response.ok) throw new Error('Email ou senha invalidos.');
            return response;
        })
        .then(response => response.json())
        .then(async (response) => {
            console.log(response);
            sessionStorage.setItem('jwtToken', response.jwt);
            sessionStorage.setItem('userId', response.user.id);
            console.log(JSON.stringify(response));
            console.log(data);
            let publicUserId = await getPublicUserId(response.jwt);
            sessionStorage.setItem('publicUserId', publicUserId);
            console.log('Token:', response.jwt, 'User ID:', publicUserId);
            sessionStorage.setItem('privateId', response.user.documentId);
            console.log("publicUserId: " + sessionStorage.getItem('publicUserId'));
            window.location.href = '../home';


        })
        .catch(error => {
            console.log(error);
        })


}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let email = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;
    login(email, senha);
})
