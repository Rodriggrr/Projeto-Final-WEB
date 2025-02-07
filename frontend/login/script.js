let form = document.getElementById('form');

let URL = 'http://localhost:1337/api';

async function login(email, senha) {
    let response = fetch(`${URL}/auth/local`, {
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
        if(!response.ok) throw new Error('Email ou senha invalidos.');
        return response;
    })
    .then(response => response.json())
    .then((response) => {
        console.log(response);
        sessionStorage.setItem('jwtToken', response.jwt);
        sessionStorage.setItem('userId', response.user.id);
        console.log(JSON.stringify(response));

        fetch('http://localhost:1337/api/users/me?populate[0]=usuario', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${response.jwt}`
            }
        }).then(response => response.json())
          .then((data) => { 
            console.log(data);
            sessionStorage.setItem('publicUserId', data.usuario.documentId);
            console.log('Token:', response.jwt, 'User ID:', data.usuario.documentId);
        }).catch(error => console.log("Erro: " + error));

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
